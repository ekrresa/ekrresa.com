import * as React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import type { AppNavLinks } from '@/lib/utils'

interface MobileNavProps {
  list: AppNavLinks
}
export function MobileNav(props: MobileNavProps) {
  const { list } = props

  const [open, toggleOpen] = React.useState(false)

  React.useLayoutEffect(() => {
    if (open) {
      // lock body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // unlock body scroll
      document.body.style.overflow = 'visible'
    }
  }, [open])

  return (
    <>
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="rounded-full px-4 py-2 text-center font-medium shadow-md shadow-rose-100 ring-1 ring-linen-950/5 backdrop-blur-lg transition-colors dark:text-port-100 dark:shadow-brand-900 dark:ring-[#364e69] sm:hidden"
        onClick={() => toggleOpen(o => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            className="fixed inset-0 z-10 flex h-full w-full justify-center overflow-y-auto"
            onClick={() => toggleOpen(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-md"
              onClick={() => toggleOpen(o => !o)}
            />

            <motion.div
              className="fixed top-8 mx-auto flex w-11/12 items-center rounded-2xl bg-linen-50/90 p-5 pb-6 backdrop-blur-md dark:bg-brand-900/70"
              initial={{
                scale: 1.1,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
              }}
              transition={{
                type: 'spring',
                bounce: 0.5,
                duration: 0.5,
              }}
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                aria-label="close modal"
                className="text-baltic-900 absolute right-2 top-2 grid h-9 w-9 cursor-pointer place-items-center rounded-full"
                onClick={() => toggleOpen(o => !o)}
              >
                <X size={22} strokeWidth={1.5} />
              </motion.button>

              <nav aria-label="mobile navigation" className="mt-4 w-full">
                <ul className="flex flex-col gap-8 text-brand-900/90 dark:text-port-100">
                  <li className="w-full border-b border-brand-800/10 pb-1 dark:border-zinc-100/40">
                    <Link href="/" className="text-base uppercase">
                      home
                    </Link>
                  </li>

                  {list.map(item => (
                    <li
                      key={item.url}
                      className="w-full border-b border-brand-800/10 pb-1 dark:border-zinc-100/40"
                    >
                      <Link href={item.url} className="text-base uppercase">
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
