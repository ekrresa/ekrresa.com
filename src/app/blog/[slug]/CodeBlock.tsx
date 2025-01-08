'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import type { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

import { copyToClipboard } from '@/lib/utils'

const AnimatedCopy = motion(Copy)
const AnimatedCheck = motion(Check)

export function CodeBlock(props: ReactMarkdownProps) {
  const codeChunk = (props as any).node.children[0].children[0].value as string

  const [copied, setCopied] = React.useState(false)

  return (
    <div className="relative overflow-x-hidden">
      <button
        aria-label="Copy code"
        className="absolute right-4 top-[2rem] rounded-md bg-[#282a36] p-1 text-white"
        onClick={async () => {
          if (copied) return

          setCopied(true)
          copyToClipboard(codeChunk)
          await new Promise(resolve => setTimeout(resolve, 2000))
          setCopied(false)
        }}
      >
        <AnimatePresence>
          {copied ? (
            <AnimatedCheck
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              size={20}
              strokeWidth={1.5}
            />
          ) : (
            <AnimatedCopy
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              size={20}
              strokeWidth={1.5}
            />
          )}
        </AnimatePresence>
      </button>

      {props.children}
    </div>
  )
}
