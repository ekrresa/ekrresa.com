import * as React from 'react'
import type { AppProps } from 'next/app'
import { Inter as FontSans } from 'next/font/google'
import Head from 'next/head'

import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import { useDarkMode } from '@/hooks/useDarkMode'
import { ThemeProvider } from '@/hooks/useThemeStore'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  const theme = useDarkMode()

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
