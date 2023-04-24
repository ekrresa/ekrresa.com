import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiMoon } from 'react-icons/bi'
import { TbSunFilled } from 'react-icons/tb'

import { useTheme } from '@/hooks/useTheme'
import LogoDark from '~/public/logo-dark.svg'
import LogoLight from '~/public/logo-light.svg'
import { MobileNav } from './MobileNav'

const navList = [
  { text: 'blog', url: '/blog' },
  { text: 'projects', url: '/projects' },
  { text: 'about', url: '/about' },
] as const

export type NavList = typeof navList

export function Header() {
  const { state, dispatch } = useTheme()
  const router = useRouter()

  return (
    <header className="border-b border-zinc-200 dark:border-smoke-600">
      <div className="mx-auto flex max-w-[70rem] items-center justify-between p-5">
        <MobileNav list={navList} />
        <Link href="/">
          {state.theme === 'light' ? <LogoLight width={48} /> : <LogoDark width={48} />}
        </Link>

        <nav className="hidden sm:block">
          <ul className="flex items-center justify-between gap-4">
            {navList.map(item => {
              const isActive = router.asPath.includes(item.url)

              return (
                <li key={item.text}>
                  <Link
                    className="group relative font-medium uppercase text-brand-900/90 dark:text-port-100"
                    href={item.url}
                  >
                    <span>{item.text}</span>
                    {isActive ? (
                      <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-sunglo-400"></span>
                    ) : (
                      <>
                        <span className="absolute -bottom-1 left-1/2 h-[3px] w-0 bg-sunglo-400 transition-all group-hover:w-1/2"></span>
                        <span className="absolute -bottom-1 right-1/2 h-[3px] w-0 bg-sunglo-400 transition-all group-hover:w-1/2"></span>
                      </>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <button onClick={() => dispatch({ type: 'toggle' })}>
          {state.theme === 'dark' ? (
            <BiMoon className="text-[1.75rem] transition-all dark:text-port-100 hover:dark:text-port-300" />
          ) : (
            <TbSunFilled className="text-[1.75rem] transition-all hover:text-brand-900/80" />
          )}
        </button>
      </div>
    </header>
  )
}
