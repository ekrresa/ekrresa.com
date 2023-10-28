'use client'

import Giscus from '@giscus/react'

import { useTheme } from '@/hooks/useTheme'

export function Comments() {
  const { state } = useTheme()

  return (
    <Giscus
      id="comments"
      repo="ekrresa/ekrresa.com"
      repoId="R_kgDOJJVC9A"
      category="Announcements"
      categoryId="DIC_kwDOJJVC9M4CVd8P"
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={state.theme === 'light' ? 'light' : 'dark_dimmed'}
      lang="en"
      loading="lazy"
    />
  )
}
