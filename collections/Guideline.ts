import type { CollectionConfig } from 'payload'
import { slugify, makeUniqueSlug } from '../lib/slugify'

export const Guideline: CollectionConfig = {
  slug: 'guidelines',
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
            collection: 'guidelines' as any,
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
    {
      name: 'localeSummary',
      type: 'group',
      label: 'Locale Summary',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'locale',
              type: 'text',
              label: 'Locale',
            },
            {
              name: 'countryISO',
              type: 'text',
              label: 'Country ISO',
              maxLength: 3,
              minLength: 2,
            },
            {
              name: 'dialingCode',
              type: 'number',
              label: 'Dialing Code (Prefix)',
            },
            {
              name: 'countryCode',
              type: 'number',
              label: 'Country Code (MCC)',
            },
          ],
        }

      ],
    },
    {
      name: 'regulatoryRequirements',
      type:'group',
      label: 'Sender Id Registration Regulations',
      fields: [
        {
          name: 'requirementsSelection',
          type: 'select',
          label: 'Registration Requirement Selection',
          options: [
            {
              label: 'No Sender Id Registration',
              value: 'noReg',
            },
              {
                label: 'Optional Sender Id Registration',
                value: 'optReg',
              },
              {
                label: 'Mandatory Sender Id Registration',
                value: 'mandReg',
              },
          ],
        }
      ]
    },
    {
      name: 'description',
      type: 'richText',
    },

    {
      name: 'localOperators',
      type: 'array',
      label: 'Local Operators',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'operator',
              type: 'text',
              label: 'Operator',
            },
            {
              name: 'mnc',
              type: 'number',
              label: 'MNC',
            },
            {
              name: 'numericId',
              type: 'checkbox',
              label: 'Numeric Id',
              defaultValue: false,
            },
            {
              name: 'alphaId',
              type: 'checkbox',
              label: 'AlphaId',
              defaultValue: false,
            },
            {
              name: 'shortCode',
              type: 'checkbox',
              label: 'Short Code',
              defaultValue: false,
            },
          ],
        },

        {
          name: 'comments',
          type: 'textarea',
          label: 'Comments',
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      label: 'Feature Group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'dedicatedShortcodes',
              type: 'checkbox',
              label: 'Dedicated Shortcodes',
              defaultValue: true,
            },        {
              name: 'sharedShortcodes',
              type: 'checkbox',
              label: 'Shared Shortcodes',
              defaultValue: true,
            },
            {
              name: 'longnumbers',
              type: 'checkbox',
              label: 'Longnumbers',
              defaultValue: true,
            },

          ]
        },

      ],
    },

  ],
}

