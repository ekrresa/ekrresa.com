'use client'

import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('json', json)

export function CodeHighlighter({ node, inline, className, children, ...props }: any) {
  const hasLang = /language-(\w+)/.exec(className || '')

  return !inline ? (
    <SyntaxHighlighter
      language={hasLang ? hasLang[1] : 'javascript'}
      showLineNumbers
      style={oneDark}
      PreTag="div"
      className="!overflow-y-hidden !bg-transparent !p-0"
      codeTagProps={{ className: '!bg-transparent !p-0' }}
      lineNumberStyle={{ minWidth: '0px' }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className="!px-1 font-semibold" {...props}>
      {children}
    </code>
  )
}
