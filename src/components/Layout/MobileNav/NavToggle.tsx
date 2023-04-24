import * as React from 'react'
import { MotionProps, motion } from 'framer-motion'

interface Props {
  open: boolean
  toggle: () => void
}
export function NavToggle({ open, toggle }: Props) {
  return (
    <motion.button className="relative z-10 py-2 pl-1 pr-2 sm:hidden" onClick={toggle}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          initial="closed"
          animate={open ? 'open' : 'closed'}
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          initial="closed"
          animate={open ? 'open' : 'closed'}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          initial="closed"
          animate={open ? 'open' : 'closed'}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </motion.button>
  )
}

const Path = (props: MotionProps & React.ComponentPropsWithoutRef<'path'>) => (
  <motion.path
    className="stroke-brand-800 dark:stroke-port-100"
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
)
