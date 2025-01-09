'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SunDimIcon } from 'lucide-react'

import { useTheme } from '@/hooks/useTheme'
import { appNavLinks } from '@/lib/utils'
import { MobileNav } from './MobileNav'

import DarkMoonIcon from '~/public/dark-moon.svg'
import LogoDark from '~/public/logo-dark.svg'
import LogoLight from '~/public/logo-light.svg'

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <header>
      <div className="mx-auto flex max-w-[70rem] items-center justify-between p-5 backdrop:blur-lg">
        <Link
          aria-label="Click to go home"
          className="rounded-full shadow-lg shadow-rose-100 ring-1 ring-linen-900/5 dark:shadow-brand-900 dark:ring-0"
          href="/"
        >
          {theme === 'light' ? <LogoLight width={48} /> : <LogoDark width={48} />}
        </Link>

        <nav className="hidden rounded-full px-8 py-2 shadow-md shadow-rose-100 ring-1 ring-linen-900/5 backdrop-blur-lg dark:bg-charcoal dark:shadow-brand-900 dark:ring-[#364e69] sm:block">
          <ul className="flex items-center justify-between gap-4">
            {appNavLinks.map(item => {
              const isActive = pathname.includes(item.url)

              return (
                <li key={item.text}>
                  <Link
                    className={`font-medium uppercase text-brand-900/90 transition-colors hover:text-rose-500 dark:text-linen-50 dark:hover:text-cyan-300 ${
                      isActive ? 'text-rose-500 dark:text-cyan-300' : ''
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
            className="flex h-10 w-11 items-center justify-center rounded-full text-rose-500 shadow-md shadow-rose-100 ring-1 ring-linen-950/5 backdrop-blur-lg transition-colors hover:text-rose-400 dark:text-port-100 dark:shadow-lg dark:shadow-brand-900 dark:ring-[#364e69] hover:dark:text-port-300"
            onClick={() => toggleTheme()}
          >
            {theme === 'light' ? (
              <DarkMoonIcon strokeWidth={2} width={24} />
            ) : (
              <SunDimIcon strokeWidth={2} size={28} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
