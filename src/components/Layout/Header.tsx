'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/hooks/useTheme'
import { appNavLinks } from '@/lib/utils'
import LogoDark from '~/public/logo-dark.svg'
import LogoLight from '~/public/logo-light.svg'
import { MobileNav } from './MobileNav'

export function Header() {
  const pathname = usePathname()
  const { state, dispatch } = useTheme()

  return (
    <header>
      <div className="mx-auto flex max-w-[70rem] items-center justify-between p-5 backdrop:blur-lg">
        <Link
          aria-label="Click to go home"
          className="rounded-full shadow-xl ring-1 ring-linen-900/5 dark:shadow-xl dark:shadow-brand-900 dark:ring-0"
          href="/"
        >
          {state.theme === 'light' ? <LogoLight width={48} /> : <LogoDark width={48} />}
        </Link>

        <nav className="hidden rounded-full px-8 py-2 shadow-lg ring-1 ring-linen-900/5 backdrop-blur-lg dark:bg-brand-950 dark:ring-[#364e69] sm:block">
          <ul className="flex items-center justify-between gap-4">
            {appNavLinks.map(item => {
              const isActive = pathname.includes(item.url)

              return (
                <li key={item.text}>
                  <Link
                    className={`font-medium uppercase text-brand-900/90 transition-colors hover:text-sunglo-500 dark:text-linen-50 dark:hover:text-sunglo-300 ${
                      isActive ? 'text-sunglo-500 dark:text-sunglo-300' : ''
                    }`}
                    href={item.url}
                  >
                    {item.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <MobileNav list={appNavLinks} />

          <button
            aria-label="Toggle dark mode"
            className="flex h-10 w-11 items-center justify-center rounded-full text-sunglo-500 shadow-lg ring-1 ring-linen-950/5 backdrop-blur-lg transition-colors hover:text-sunglo-400 dark:text-port-100 dark:ring-[#364e69] hover:dark:text-port-300"
            onClick={() => dispatch({ type: 'toggle' })}
          >
            {state.theme === 'dark' ? (
              <Moon strokeWidth={2} size={24} />
            ) : (
              <Sun strokeWidth={2} size={24} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
