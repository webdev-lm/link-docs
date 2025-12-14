import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Guideline } from './collections/Guideline'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Guideline],
  folders: {
    debug: true, // optional
    fieldName: 'folder', // optional
    slug: 'payload-folders', // optional
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'noreply@linkmobility.com',
    defaultFromName: process.env.SMTP_FROM_NAME || 'Link Graph',
    transport: (() => {
      const port = parseInt(process.env.SMTP_PORT || '587', 10)
      const isSecurePort = port === 465
      // For Office365/Outlook:
      // - Port 587: secure: false, use TLS (STARTTLS)
      // - Port 465: secure: true (SSL/TLS)
      const transportConfig = {
        host: process.env.SMTP_HOST,
        port,
        secure: isSecurePort || process.env.SMTP_SECURE === 'true',
        // TLS options for port 587 (STARTTLS) - matching working config pattern
        ...(port === 587 && {
          tls: {
            rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED === 'true' ? true : false,
          },
        }),
        auth: process.env.SMTP_USER && process.env.SMTP_PASS
          ? {
              // Trim whitespace that might cause auth issues
              user: process.env.SMTP_USER.trim(),
              pass: process.env.SMTP_PASS.trim(),
            }
          : undefined,
        // Connection timeouts
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000,
      }
      
      // Log transport config

      
      const transport = nodemailer.createTransport(transportConfig)
      
      // Wrap sendMail to log before each send request
      const originalSendMail = transport.sendMail.bind(transport)
      transport.sendMail = function (mailOptions: any, callback?: any) {
        console.log('[SMTP] Sending email with config:', {
          host: transportConfig.host,
          port: transportConfig.port,
          secure: transportConfig.secure,
          tls: transportConfig.tls,
          auth: transportConfig.auth,
          to: mailOptions.to,
          from: mailOptions.from,
          subject: mailOptions.subject,
        })
        if (callback) {
          return originalSendMail(mailOptions, callback)
        } else {
          return originalSendMail(mailOptions)
        }
      } as typeof transport.sendMail
      
      // Verify connection on startup (optional, can be disabled for faster startup)
      if (process.env.SMTP_VERIFY_ON_STARTUP !== 'false') {
        transport.verify().catch((error: { message: any }) => {
          console.error('[SMTP] Connection verification failed:', error.message)
          console.error('[SMTP] Make sure your SMTP credentials are correct and you\'re using an App Password for Office365 if 2FA is enabled')
        })
      }
      
      return transport
    })(),
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
