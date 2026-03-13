'use client'

import React from 'react'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'

// Lexical list types: "bullet" (ul), "number" (ol), "check" (checkbox list). We treat all as styled ul/ol.
const UL_CLASS = ' list-disc list-outside ms-4 '
const OL_CLASS = ' list-decimal list-outside ms-4'
const LI_CLASS = 'relative pl-0 '

export const customListConverters: Pick<JSXConverters, 'list' | 'listitem'> = {
  list: ({ node, nodesToJSX }) => {
    const Tag = node.tag as 'ul' | 'ol'
    const className = Tag === 'ol' ? OL_CLASS : UL_CLASS
    return React.createElement(Tag, { className }, nodesToJSX({ nodes: node.children }))
  },
  listitem: ({ node, nodesToJSX }) => {
    return React.createElement(
      'li',
      { className: LI_CLASS, value: node?.value },
      nodesToJSX({ nodes: node.children })
    )
  },
}
