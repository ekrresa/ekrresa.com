'use client'

import * as React from 'react'

export type Theme = 'light' | 'dark' | null
type Action = { type: 'light' } | { type: 'dark' } | { type: 'toggle' }
type Dispatch = (action: Action) => void
type State = { theme: Theme }

interface ThemeState {
  state: State
  dispatch: Dispatch
}

const ThemeContext = React.createContext<ThemeState | undefined>(undefined)

function themeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'light': {
      return { theme: 'light' }
    }
    case 'dark': {
      return { theme: 'dark' }
    }
    case 'toggle': {
      return { theme: state.theme === 'light' ? 'dark' : 'light' }
    }

    default: {
      throw new Error('Unhandled action type')
    }
  }
}

type ThemeProviderProps = React.PropsWithChildren<{}>

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = React.useReducer(themeReducer, { theme: null })

  useLayoutEffect(() => {
    const persistedState = localStorage.getItem('app-theme')

    if (
      persistedState === 'dark' ||
      (!persistedState && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      dispatch({ type: 'dark' })
    } else {
      dispatch({ type: 'light' })
    }
  }, [])

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    const onDarkModeChange = (evt: MediaQueryListEvent) => {
      if (evt.matches) {
        dispatch({ type: 'dark' })
      } else {
        dispatch({ type: 'light' })
      }
    }

    mq.addEventListener('change', onDarkModeChange)

    return () => {
      mq.removeEventListener('change', onDarkModeChange)
    }
  }, [])

  // Synchronize theme changes to window & localStorage
  React.useEffect(() => {
    if (!state.theme) return

    const root = window.document.documentElement
    const isDark = state.theme === 'dark'

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('app-theme', state.theme)
  }, [state.theme])

  const value = { state, dispatch }

  return state.theme ? (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  ) : null
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}

declare const window: any

const useLayoutEffect =
  typeof window !== 'undefined' && window.document && window.document.createElement
    ? React.useLayoutEffect
    : React.useEffect
