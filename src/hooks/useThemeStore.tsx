import * as React from 'react'
import { createStore, useStore } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

interface ThemeProps {
  theme: Theme
}

interface ThemeState extends ThemeProps {
  toggleTheme: () => void
  setDark: () => void
  setLight: () => void
}

type ThemeStore = ReturnType<typeof createThemeStore>

const createThemeStore = (initProps?: Partial<ThemeProps>) => {
  const DEFAULT_PROPS: ThemeProps = {
    theme: 'light',
  }

  return createStore<ThemeState>()(set => ({
    ...DEFAULT_PROPS,
    ...initProps,
    toggleTheme: () =>
      set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    setDark: () => set({ theme: 'dark' }),
    setLight: () => set({ theme: 'light' }),
  }))
}

const ThemeContext = React.createContext<ThemeStore | null>(null)

type ThemeProviderProps = React.PropsWithChildren<ThemeProps>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const storeRef = React.useRef<ThemeStore>()

  if (!storeRef.current) {
    storeRef.current = createThemeStore(props)
  }

  return (
    <ThemeContext.Provider value={storeRef.current}>{children}</ThemeContext.Provider>
  )
}

export function useThemeStore() {
  const store = React.useContext(ThemeContext)

  if (!store) throw new Error('Missing Theme.Provider in the tree')

  store.subscribe(state => {
    if (window) {
      const root = window.document.documentElement
      const isDark = state.theme === 'dark'

      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }

      localStorage.setItem('app-theme', state.theme)
    }
  })

  const { setDark, setLight, theme, toggleTheme } = useStore(store, state => state)

  return { setDark, setLight, theme, toggleTheme }
}
