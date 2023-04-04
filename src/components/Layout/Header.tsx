import React from 'react'
import Link from 'next/link'
import { BiMoon } from 'react-icons/bi'
import { TbSunFilled } from 'react-icons/tb'

import { useThemeStore } from '@/hooks/useThemeStore'
import LogoDark from '~/public/logo-dark.svg'
import LogoLight from '~/public/logo-light.svg'

const navList = [
  { text: 'blog', url: '/blog' },
  { text: 'projects', url: '/projects' },
  { text: 'about', url: '/about' },
]

export function Header() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6">
      <Link href="/">
        {theme === 'light' ? <LogoLight width={48} /> : <LogoDark width={48} />}
      </Link>

      <nav>
        <ul className="flex items-center justify-between gap-4">
          {navList.map(item => (
            <li key={item.text}>
              <Link
                className="font-medium uppercase text-brand-900/90 dark:text-port-100"
                href={item.url}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button onClick={toggleTheme}>
        {theme === 'dark' ? (
          <BiMoon className="text-[1.75rem] dark:text-port-100" />
        ) : (
          <TbSunFilled className="text-[1.75rem]" />
        )}
      </button>
    </header>
  )
}
