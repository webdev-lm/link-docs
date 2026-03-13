/**
 * Converts a URL slug back to a human-readable label
 * @param slug - The slug to unslugify (e.g. "sender-id", "regulatory-guidelines")
 * @returns A formatted label (e.g. "Sender Id", "Regulatory Guidelines")
 */
export function unslugify(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ") // Replace dashes/underscores with space
    .replace(/[^a-zA-Z0-9 ]/g, "") // Remove other special characters
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
    .replace("Sms", "SMS")
    .replace("Whatsapp", "WhatsApp")
    .replace("Rcs", "RCS")
    .replace("Api", "API")
    .replace("Mylink", "MyLINK")
}

/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A slugified string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    // Remove special characters except hyphens
    .replace(/[^\w\-]+/g, '')
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Generates a unique slug by appending a number if the slug already exists
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function makeUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug
  }

  let counter = 1
  let uniqueSlug = `${baseSlug}-${counter}`

  while (existingSlugs.includes(uniqueSlug)) {
    counter++
    uniqueSlug = `${baseSlug}-${counter}`
  }

  return uniqueSlug
}


