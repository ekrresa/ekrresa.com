import { siteMetadata } from '@/lib/metadata'

export function Footer() {
  return (
    <footer className="mt-48 w-full border-t border-zinc-200 px-5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 py-4 text-sm text-brand-900/90 sm:flex-row">
        <p className="uppercase">All rights reserved &#169; {new Date().getFullYear()}</p>
        <p className="hidden uppercase sm:block">
          Designed by{' '}
          <a href={siteMetadata.github} target="_blank" rel="noreferrer noopener">
            Ochuko Ekrresa
          </a>
        </p>
      </div>
    </footer>
  )
}
