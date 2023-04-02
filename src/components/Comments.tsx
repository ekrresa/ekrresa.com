import Giscus from '@giscus/react'

import { useThemeStore } from '@/lib/theme'

export function Comments() {
  const theme = useThemeStore(state => state.theme)

  return (
    <Giscus
      id="comments"
      repo="ekrresa/ekrresa.com"
      repoId="R_kgDOJJVC9A"
      category="Announcements"
      categoryId="DIC_kwDOJJVC9M4CVd8P"
      mapping="url"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'light' ? 'light' : 'dark_dimmed'}
      lang="en"
      loading="lazy"
    />
  )
}
