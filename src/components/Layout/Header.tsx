import React from 'react'
import Link from 'next/link'
import { BiMoon } from 'react-icons/bi'

import LogoLight from '~/public/logo-light.svg'

const navList = [
  { text: 'blog', url: '/blog' },
  { text: 'projects', url: '/projects' },
  { text: 'about', url: '/about' },
]

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between py-6 px-5">
      <Link href="/">
        <LogoLight width={48} />
      </Link>

      <nav>
        <ul className="flex items-center justify-between gap-4">
          {navList.map(item => (
            <li key={item.text}>
              <Link className="font-medium uppercase text-brand-900/90" href={item.url}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <BiMoon className="text-2xl" />
    </header>
  )
}
