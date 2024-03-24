import React from 'react'
import { Code } from 'bright'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

export async function CodeHighlighter({ inline, children }: CodeProps) {
  if (!inline) {
    return (
      <Code
        //@ts-expect-error line-number-color
        style={{ '--line-number-color': '#6272A4' }}
        lang="ts"
        theme="dracula"
        lineNumbers
      >
        {String(children).replace(/\n$/, '')}
      </Code>
    )
  }

  return <code className="!px-1 font-semibold">{children}</code>
}
