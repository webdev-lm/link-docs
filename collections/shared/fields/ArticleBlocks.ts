import { Block, Field } from "payload"

const RichTextBlock: Block = {
    slug: 'richText',
    fields: [
        {
            name: 'richText',
            type: 'richText',
            required: false,
        },
    ],
}

const ImageBlock:Block = {
    slug: 'image-block',
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'alt',
            type: 'text',
            required: true,
            admin: {
                description: 'The alt text to use for the image.',
            },
        },
        {
            name: 'caption',
            type: 'text',
            required: false,
            admin: {
                description: 'The caption to use for the image.',
            },
        },
    ]
}

const NoteBlock:Block = {
    slug: 'note-block',
    fields: [
        {
            name: 'note',
            type: 'text',
            required: true,
        },
        {
            name: 'note-type',
            type: 'select',
            required: true,
            options: ['suggestion','note', 'warning', 'danger'],
        },
    ]
}

const MarkdownTableBlock:Block = {
    slug: 'markdown-table',
    fields : [
        {
            name: 'markdown-table',
            type: 'textarea',
            required: true,
            admin: {
                description: `The markdown table to use for the article.
                Use the following format:
                | Header 1 | Header 2 | Header 3 |
                |----------|----------|----------|
                | Cell 1   | Cell 2   | Cell 3   |
                | Cell 4   | Cell 5   | Cell 6   |
                | Cell 7   | Cell 8   | Cell 9   |
                `,
            },
        },
    ]
    
}

const RelatedArticlesBlock:Block = {
    slug:'related-articles-block',
    fields: [
        {
            name: 'related-articles-title',
            type: 'text',
            required: true,
            admin: {
                description: 'The title to use for the related articles block.',
            },
        },
        {
            name: 'related-articles',
            type: 'relationship',
            hasMany: true,
            // relationTo: 'product-guide',
            relationTo: ['pguide','guidelines'],
            required: true,
        },
    ]

}

export const ArticleBlocks: Field = {
    name: 'content',
    type: 'blocks',
    blocks: [
        RichTextBlock,
        ImageBlock,
        NoteBlock,
        MarkdownTableBlock,
        RelatedArticlesBlock,
    ]
}