import Link from 'next/link'

import { Layout } from '@/components/Layout'
import { getRelativeTimeToNow } from '@/lib/date'
import { capitalizeString } from '@/lib/utils'

export default function Home() {
  return (
    <Layout>
      <section className="mt-32 md:mt-48 md:px-12 md:pb-12">
        <p className="ml-1 text-xl font-semibold uppercase text-brand-700/80">
          ochuko ekrresa
        </p>
        <h1 className="mb-4 bg-gradient-to-r from-brand-500  to-brand-800 bg-clip-text text-7xl font-semibold uppercase leading-none text-transparent md:text-[4.8rem]">
          software engineer
        </h1>
        <p className="max-w-2xl text-lg text-brand-700/90">
          Hi, my name is Ochuko and this is my digital garden. I&apos;ve learnt a lot over
          the years working on interesting projects and I share my knowledge here.
        </p>

        <div className="mt-6 flex gap-6 text-brand-700/90">
          <a
            href="#"
            className="uppercase underline decoration-[#df7373] decoration-[3px] underline-offset-[3px]"
          >
            github
          </a>
          <a
            href="#"
            className="uppercase underline decoration-[#df7373] decoration-[3px] underline-offset-[3px]"
          >
            linkedin
          </a>
        </div>
      </section>

      <section className="mt-32 md:mt-48">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {new Array(5).fill(0).map((_, index) => (
            <li
              key={index}
              className="rounded-xl px-3 py-4 transition-all hover:ring-brand-600 hover:ring-2 duration-300"
            >
              <p className="mb-1 text-sm text-smoke-600/90">
                {capitalizeString(getRelativeTimeToNow(new Date()))}
              </p>

              <Link href="#" className="mb-2 inline-block text-2xl text-brand-700/90">
                <h3 className="font-semibold">The Sliding Window Pattern</h3>
              </Link>

              <p className="leading-6 text-smoke-700">
                While the course itself is incredibly informative, I felt that visualizing
                the patterns themselves makes them just a bit more clear to understand.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
