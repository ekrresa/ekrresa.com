import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Ochuko Ekrresa – Software Engineer, Developer, Writer',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function About() {
  return (
    <section className="mt-12">
      <header className="pl-2">
        <h1 className="heading text-4xl font-bold uppercase">About</h1>
        <p className="mt-4 text-2xl font-medium capitalize">Coming soon 👀</p>
      </header>
    </section>
  )
}
