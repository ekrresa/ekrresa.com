import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiMoon } from 'react-icons/bi'
import { TbSunFilled } from 'react-icons/tb'

import { useTheme } from '@/hooks/useTheme'
import LogoDark from '~/public/logo-dark.svg'
import LogoLight from '~/public/logo-light.svg'

const navList = [
  { text: 'blog', url: '/blog' },
  { text: 'projects', url: '/projects' },
  { text: 'about', url: '/about' },
]

export function Header() {
  const { state, dispatch } = useTheme()
  const router = useRouter()

  return (
    <header className="mx-auto flex w-full max-w-[70rem] items-center justify-between px-5 py-6">
      <Link href="/">
        {state.theme === 'light' ? <LogoLight width={48} /> : <LogoDark width={48} />}
      </Link>

      <nav>
        <ul className="flex items-center justify-between gap-4">
          {navList.map(item => (
            <li key={item.text}>
              <Link
                className="group relative font-medium uppercase text-brand-900/90 dark:text-port-100"
                href={item.url}
              >
                <span>{item.text}</span>
                {router.asPath.includes(item.url) ? (
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-sunglo-400"></span>
                ) : (
                  <>
                    <span className="absolute -bottom-1 left-1/2 h-[3px] w-0 bg-sunglo-400 group-hover:w-1/2 group-hover:transition-all"></span>
                    <span className="absolute -bottom-1 right-1/2 h-[3px] w-0 bg-sunglo-400 group-hover:w-1/2 group-hover:transition-all"></span>
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button onClick={() => dispatch({ type: 'toggle' })}>
        {state.theme === 'dark' ? (
          <BiMoon className="text-[1.75rem] transition-all dark:text-port-100 hover:dark:text-port-300" />
        ) : (
          <TbSunFilled className="text-[1.75rem] transition-all hover:text-brand-900/80" />
        )}
      </button>
    </header>
  )
}
