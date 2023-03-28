import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps extends React.PropsWithChildren<{}> {}
export function Layout(props: LayoutProps) {
  return (
    <div
      style={{ gridTemplateRows: 'auto 1fr auto' }}
      className="relative grid min-h-screen bg-smoke-50"
    >
      <Header />
      <main className="mx-auto w-full max-w-5xl px-5">{props.children}</main>
      <Footer />
    </div>
  )
}
