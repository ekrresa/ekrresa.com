import * as React from 'react'
import Link from 'next/link'
import { Variants, motion } from 'framer-motion'

import { type NavList } from '../Header'
import { NavToggle } from './NavToggle'

interface MobileNavProps {
  list: NavList
}
export function MobileNav(props: MobileNavProps) {
  const { list } = props

  const [open, toggleOpen] = React.useState(false)

  return (
    <>
      <NavToggle open={open} toggle={() => toggleOpen(o => !o)} />
      <motion.section
        className="fixed inset-y-0 left-0 h-full w-full bg-linen-50/70 p-5 pt-40 backdrop-blur-md dark:bg-brand-900/70 sm:hidden "
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={containerVariants}
        onClick={() => toggleOpen(false)}
      >
        <nav aria-label="mobile navigation" className="w-full">
          <motion.ul
            className="flex flex-col gap-8"
            initial="closed"
            animate={open ? 'open' : 'closed'}
            variants={navVariants}
          >
            <motion.li
              className="w-full border-b border-brand-800/50 pb-1 dark:border-zinc-300"
              variants={navItemVariants}
            >
              <Link href="/" className="text-lg uppercase">
                home
              </Link>
            </motion.li>

            {list.map(item => (
              <motion.li
                key={item.url}
                className="w-full border-b border-brand-800/50 pb-1 dark:border-zinc-300"
                variants={navItemVariants}
              >
                <Link href={item.url} className="text-lg uppercase">
                  {item.text}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </motion.section>
    </>
  )
}

const containerVariants: Variants = {
  open: {
    touchAction: 'none',
    opacity: 1,
    pointerEvents: 'auto',
  },
  closed: {
    touchAction: 'auto',
    opacity: 0,
    pointerEvents: 'none',
  },
}

const navVariants: Variants = {
  open: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.3 },
  },
  closed: {
    opacity: 0,
    transition: { when: 'afterChildren', staggerChildren: 0.1, staggerDirection: -1 },
  },
}

const navItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
}
