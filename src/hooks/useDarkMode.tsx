import * as React from 'react'

import { Theme } from './useThemeStore'

export function useDarkMode() {
  const [theme, setTheme] = React.useState<Theme>('light')

  console.log('theme', theme)

  useLayoutEffect(() => {
    if (
      localStorage['app-theme'] === 'dark' ||
      (!('app-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      console.log('here')
      setTheme('dark')
    } else {
      console.log('there')
      setTheme('light')
    }
  }, [])

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    const onDarkModeChange = (evt: MediaQueryListEvent) => {
      if (evt.matches) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }

    mq.addEventListener('change', onDarkModeChange)

    return () => {
      mq.removeEventListener('change', onDarkModeChange)
    }
  }, [])

  return theme
}

declare const window: any

const useLayoutEffect =
  typeof window !== 'undefined' && window.document && window.document.createElement
    ? React.useLayoutEffect
    : React.useEffect
