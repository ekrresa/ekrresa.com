import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps extends React.PropsWithChildren<{}> {}
export function Layout(props: LayoutProps) {
  return (
    <div className="relative flex flex-col min-h-screen bg-smoke-50">
      <Header />
      <main className="mx-auto w-full flex-1 max-w-5xl px-5">{props.children}</main>
      <Footer />
    </div>
  )
}
