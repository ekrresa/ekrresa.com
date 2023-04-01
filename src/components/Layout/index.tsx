import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps extends React.PropsWithChildren<{}> {}
export function Layout(props: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5">{props.children}</main>
      <Footer />
    </div>
  )
}
