import React from 'react'

import { PostPreview } from '@/components/PostPreview'
import { siteMetadata } from '@/lib/metadata'
import { getPublishedPosts } from '@/lib/posts'

export default function Home() {
  const posts = getPublishedPosts()

  return (
    <div>
      <section className="mt-24 text-center md:mt-48 md:pb-12">
        <p className="heading text-xl font-semibold uppercase">ochuko ekrresa</p>
        <h1 className="heading -ml-1 mb-4 text-main-heading font-extrabold uppercase leading-none">
          software engineer
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-brand-900/90 dark:text-port-100">
          Hi, my name is Ochuko and this is my digital garden. I&apos;ve learnt a lot over
          the years working on interesting projects and I share my knowledge here.
        </p>

        <div className="mt-6 flex justify-center gap-6 text-brand-900/90 dark:text-port-100">
          <a
            href={siteMetadata.github}
            className="uppercase underline decoration-sunglo-400 decoration-[3px] underline-offset-[3px] transition-all hover:underline-offset-[5px]"
          >
            github
          </a>
          <a
            href={siteMetadata.linkedin}
            className="uppercase underline decoration-sunglo-400 decoration-[3px] underline-offset-[3px] transition-all hover:underline-offset-[5px]"
          >
            linkedin
          </a>
        </div>
      </section>

      <section className="mt-40 md:mt-48">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {posts.map((post, index) => (
            <PostPreview
              key={post.url}
              className={index % 2 === 1 ? 'md:text-end' : ''}
              post={post}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}
