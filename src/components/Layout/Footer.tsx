import { siteMetadata } from '@/lib/metadata'

export function Footer() {
  return (
    <footer className="mx-auto mt-48 w-full max-w-7xl border-t border-romance-100 dark:border-stone-800">
      <div className="mx-auto flex max-w-[70rem] flex-col items-center justify-between gap-2 px-5 py-4 text-sm font-medium text-brand-900/90 dark:text-smoke-100/80 sm:flex-row">
        <p className="uppercase">All rights reserved &#169; {new Date().getFullYear()}</p>
        <p className="hidden uppercase sm:block">
          <a href={siteMetadata.github} target="_blank" rel="noreferrer noopener">
            Ochuko Ekrresa
          </a>
        </p>
      </div>
    </footer>
  )
}
