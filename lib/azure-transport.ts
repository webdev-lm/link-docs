import * as msal from '@azure/msal-node'
import { SentMessageInfo, Transport, TransportOptions } from 'nodemailer'
import MailMessage from 'nodemailer/lib/mailer/mail-message'

export interface AzureTransportOptions extends TransportOptions {
  clientId: string
  clientSecret: string
  tenantId: string
  saveToSentItems?: boolean
}

export class AzureTransport implements Transport<SentMessageInfo> {
  name: string
  version: string

  private config: AzureTransportOptions
  private graphEndpoint: string
  private tokenInfo: msal.AuthenticationResult | null
  private msalClient: msal.ConfidentialClientApplication

  public constructor(config: AzureTransportOptions) {
    this.name = 'Azure'
    this.version = '0.1'
    this.config = config
    this.graphEndpoint = 'https://graph.microsoft.com'
    this.tokenInfo = null

    // Create MSAL client once (to avoid re-instantiation)
    this.msalClient = new msal.ConfidentialClientApplication({
      auth: {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        authority: `https://login.microsoftonline.com/${config.tenantId}`,
      },
    })
  }

  /**
   * Check if the access token is expired
   */
  protected isTokenExpired(): boolean {
    if (!this.tokenInfo?.expiresOn) return true // Assume token is expired if no expiration is set
    return Date.now() > this.tokenInfo.expiresOn.getTime()
  }

  /**
   * Get an access token from Azure AD
   */
  private async getAccessToken(): Promise<string> {
    if (!this.tokenInfo || this.isTokenExpired()) {
      try {
        this.tokenInfo = await this.msalClient.acquireTokenByClientCredential({
          scopes: [`${this.graphEndpoint}/.default`],
        })

        if (!this.tokenInfo || !this.tokenInfo.accessToken) {
          throw new Error('Failed to acquire access token from Azure.')
        }
      } catch (error) {
        console.error('Error acquiring Azure AD token:', error)
        throw new Error('Could not retrieve an access token.')
      }
    }
    return this.tokenInfo.accessToken
  }

  /**
   * Extract email address from various formats:
   * - Plain email: "user@example.com"
   * - Formatted string: "Name <user@example.com>" or '"Name" <user@example.com>'
   * - Object with address property: { address: "user@example.com" }
   */
  private extractEmailAddress(input: string | { address?: string } | any): string {
    // If it's an object with address property, use that
    if (typeof input === 'object' && input !== null && input.address) {
      return this.extractEmailAddress(input.address)
    }

    // If it's not a string, convert to string
    const str = typeof input === 'string' ? input : String(input)

    // Try to extract email from angle brackets (RFC 5322 format)
    // Matches: "Name <email@domain.com>" or 'Name <email@domain.com>'
    const angleBracketMatch = str.match(/<([^>]+)>/)
    if (angleBracketMatch && angleBracketMatch[1]) {
      return angleBracketMatch[1].trim()
    }

    // If no angle brackets, check if it's a valid email format
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const trimmed = str.trim()

    // If it looks like an email, return it
    if (emailRegex.test(trimmed)) {
      return trimmed
    }

    // Try to find email pattern in the string
    const emailMatch = trimmed.match(/[^\s<>"']+@[^\s<>"']+\.[^\s<>"']+/)
    if (emailMatch) {
      return emailMatch[0]
    }

    // Fallback: return the trimmed string (might cause errors, but better than crashing)
    return trimmed
  }

  /**
   * Convert nodemailer attachment to Microsoft Graph format
   */
  private async processAttachment(attachment: any): Promise<any> {
    let contentBytes: string

    if (attachment.content) {
      // If content is already a string (base64), use it directly
      if (typeof attachment.content === 'string') {
        contentBytes = attachment.content
      } else if (Buffer.isBuffer(attachment.content)) {
        // If it's a Buffer, convert to base64
        contentBytes = attachment.content.toString('base64')
      } else {
        // If it's a stream or other type, we need to handle it
        // For now, throw an error for unsupported types
        throw new Error(`Unsupported attachment content type: ${typeof attachment.content}`)
      }
    } else if (attachment.path) {
      // If path is provided, read the file
      const fs = await import('fs/promises')
      const fileContent = await fs.readFile(attachment.path)
      contentBytes = fileContent.toString('base64')
    } else {
      throw new Error('Attachment must have either content or path')
    }

    return {
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: attachment.filename || attachment.name || 'attachment',
      contentType: attachment.contentType || 'application/octet-stream',
      contentBytes,
    }
  }

  /**
   * Send an email using Microsoft Graph API
   */
  public async send(
    mail: MailMessage<SentMessageInfo>,
    callback: (err: Error | null, info: SentMessageInfo | null) => void,
  ): Promise<void> {
    try {
      const { subject, from, to, text, html, attachments = [] } = mail.data || {}

      if (!from || !to) {
        throw new Error("Missing 'from' or 'to' email address.")
      }

      // Extract email addresses from formatted strings or objects
      const fromAddress = this.extractEmailAddress(from)
      const toAddresses = Array.isArray(to)
        ? to.map((recipient) => this.extractEmailAddress(recipient))
        : [this.extractEmailAddress(to)]

      const accessToken = await this.getAccessToken()

      // Process attachments if any
      const processedAttachments = attachments.length > 0
        ? await Promise.all(attachments.map((att) => this.processAttachment(att)))
        : []

      const mailMessage = {
        message: {
          subject: subject || '',
          from: { emailAddress: { address: fromAddress } },
          toRecipients: toAddresses.map((address) => ({ emailAddress: { address } })),
          body: {
            content: html || text || '',
            contentType: html ? 'HTML' : 'Text',
          },
          ...(processedAttachments.length > 0 && { attachments: processedAttachments }),
        },
        saveToSentItems: this.config.saveToSentItems ?? true,
      }

      const response = await fetch(`${this.graphEndpoint}/v1.0/users/${fromAddress}/sendMail`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailMessage),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to send email. Status: ${response.status} - ${response.statusText}. ${errorText}`)
      }

      const responseData = await response.text()
      callback(null, responseData as unknown as SentMessageInfo)
    } catch (error: any) {
      console.error('Error sending email:', error)
      callback(error instanceof Error ? error : new Error(String(error)), null)
    }
  }
}

