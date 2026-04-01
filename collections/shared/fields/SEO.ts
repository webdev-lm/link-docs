import { Field } from "payload"

export const MetaFields: Field = {
    name: 'meta_fields',
    type: 'group',
    fields: [
        {
            name: 'seo_title',
            type: 'text',
            required: true,
            admin: {
                description: 'The title to use for the SEO meta tag.',
            },
        },
        {
            name: 'seo_description',
            type: 'text',
            required: true,
            admin: {
                description: 'The description to use for the SEO meta tag.',
            },
        },
        {
            name:'og_title',
            type: 'text',
            required:false,
            admin: {
                description: 'The title to use for the Open Graph meta tag. If not provided, the seo_title will be used.',
            },
        },
        {
            name:'og_description',
            type: 'text',
            required: false,
            admin: {
                description: 'The description to use for the Open Graph meta tag. If not provided, the seo_description will be used.',
            },
        },
        {
            name:'og_image',
            type: 'upload',
            relationTo: 'media',
            required: false,
            admin: {
                description: 'The image to use for the Open Graph image. If not provided, a default image will be used.',
            },
        },
    ],
}

export const InternalSearch: Field = {
    name: 'internal_search',
    type: 'group',
    fields: [
        {
            name: 'internal_search_title',
            type: 'text',
            required:true,
            admin: {
                description: 'The title to use to display internal search results.',
            },
        },
        {
            name: 'internal_search_description',
            type: 'text',
            required:true,
            admin: {
                description: 'The description to use to display internal search results.',
            },
        },
        {
            name:'internal_search_keywords',
            type: 'text',
            required:true,
            admin: {
                description: 'The keywords to use to optimize the internal search engine. Use very specific keywords or parts of text you want this content to rank for.',
            },
        }
    ],
}