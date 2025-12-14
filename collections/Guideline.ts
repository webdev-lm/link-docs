import type { CollectionConfig } from 'payload'

export const Guideline: CollectionConfig = {
  slug: 'guidelines',
  admin: {
    useAsTitle: 'title',
  },
  folders: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
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
              label: 'Dialing Code',
            },
            {
              name: 'countryCode',
              type: 'number',
              label: 'Country Code',
            },
          ],
        }

      ],
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
              defaultValue: false,
            },        {
              name: 'sharedShortcodes',
              type: 'checkbox',
              label: 'Shared Shortcodes',
              defaultValue: false,
            },
            {
              name: 'longnumbers',
              type: 'checkbox',
              label: 'Longnumbers',
              defaultValue: false,
            },
 
            {
              name: 'mms',
              type: 'checkbox',
              label: 'MMS',
              defaultValue: false,
            },
            {
              name: 'messageLength',
              type: 'number',
              label: 'Message Length',
            }
          ]
        },

      ],
    },
  ],
}

