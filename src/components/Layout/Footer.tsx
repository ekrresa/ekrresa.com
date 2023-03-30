import { siteMetadata } from '@/lib/metadata'

export function Footer() {
  return (
    <footer className="mt-48 w-full border-t border-zinc-200 px-5">
      <div className="mx-auto flex gap-2 flex-col sm:flex-row max-w-5xl items-center justify-between text-brand-900/90 py-4 text-sm">
        <p className="uppercase">All rights reserved &#169; {new Date().getFullYear()}</p>
        <p className="uppercase hidden sm:block">
          Designed by{' '}
          <a href={siteMetadata.github} target="_blank" rel="noreferrer noopener">
            Ochuko Ekrresa
          </a>
        </p>
      </div>
    </footer>
  )
}
