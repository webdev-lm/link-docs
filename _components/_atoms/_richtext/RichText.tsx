'use client'

import {
  defaultJSXConverters,
  RichText as RichTextConverter,
} from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { customListConverters } from './converters/listConverters'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, ...rest } = props

  return (
    <RichTextConverter
      {...rest}
      className={className}
      converters={{
        ...defaultJSXConverters,
        ...customListConverters,
      }}
    />
  )
}