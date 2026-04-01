import type { CollectionConfig } from 'payload'
import { slugify, makeUniqueSlug } from '../lib/slugify'
import { InternalSearch, MetaFields } from './shared/fields/SEO'
import { ArticleBlocks } from './shared/fields/ArticleBlocks'

export const ProductGuide: CollectionConfig = {
  slug: 'pguide',
  admin: {
    useAsTitle: 'title',
  },

  folders: true,
  hooks: {
    beforeChange: [
      async ({ data, operation, req, originalDoc }) => {
        // Only generate slug if:
        // 1. It's a create operation, OR
        // 2. The slug field is empty/undefined AND title exists
        // This allows manual editing of slug after creation
        const shouldGenerateSlug =
          operation === 'create' ||
          (!data.slug && data.title && originalDoc?.slug === undefined)

        if (shouldGenerateSlug && data.title) {
          const baseSlug = slugify(data.title)

          // Get existing slugs to ensure uniqueness
          // Using type assertion since slug field will be added to the collection
          const existingDocs = await req.payload.find({
            collection: 'pguide' as any,
            where: {
              slug: {
                exists: true,
              },
            },
            limit: 1000, // Adjust based on your needs
          })

          const existingSlugs = existingDocs.docs
            .map((doc: any) => doc.slug)
            .filter((slug: any): slug is string => typeof slug === 'string' && slug.length > 0)

          // If updating, exclude the current document's slug
          if (operation === 'update' && originalDoc && typeof originalDoc === 'object' && 'slug' in originalDoc && originalDoc.slug) {
            const currentSlug = String(originalDoc.slug)
            const currentIndex = existingSlugs.indexOf(currentSlug)
            if (currentIndex > -1) {
              existingSlugs.splice(currentIndex, 1)
            }
          }

          data.slug = makeUniqueSlug(baseSlug, existingSlugs)
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
      index: true,
      admin: {
        description: 'Auto-generated from title, but can be edited manually',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true // Allow empty on create, will be auto-generated
        // Validate slug format: lowercase, alphanumeric, hyphens only
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
        if (typeof value === 'string' && !slugRegex.test(value)) {
          return 'Slug must contain only lowercase letters, numbers, and hyphens'
        }
        return true
      },
    },
    MetaFields,
    InternalSearch,
    ArticleBlocks,
    {
      name: 'previous-next-navigation',
      type: 'group',
      fields: [
        {
          name: 'previous-guide',
          type: 'relationship',
          relationTo: 'pguide',
        },
        {
          name: 'next-guide',
          type: 'relationship',
          relationTo: 'pguide',
        },
      ],
    }
  ],
}
