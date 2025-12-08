import * as React from 'react'
import type { Metadata } from 'next'
import { Inter as FontSans, Roboto_Mono } from 'next/font/google'
import Script from 'next/script'

import { ThemeProvider } from '@/hooks/useTheme'
import { Footer } from '@/components/Layout/Footer'
import { Header } from '@/components/Layout/Header'
import { siteMetadata } from '@/lib/metadata'

import '@/styles/globals.css'

const fontSans = FontSans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
})

const fontMono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: 'Ochuko Ekrresa – Software Engineer, Developer',
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, interactive-widget=resizes-content"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={`${fontSans.variable} ${fontMono.variable}`}>
        <Script src="../lib/noflash.ts" strategy="afterInteractive" />

        <ThemeProvider>
          <div className="fixed inset-0 flex justify-center">
            <div className="w-full max-w-7xl bg-romance-50 ring-1 ring-romance-100 transition-colors dark:bg-charcoal dark:ring-stone-400/20"></div>
          </div>
          <div className="min-safe-h-screen relative flex flex-col">
            <Header />
            <main className="mx-auto w-full max-w-[70rem] flex-1 px-5">{children}</main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
