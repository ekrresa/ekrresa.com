import React from 'react'

import { PostPreview } from '@/components/PostPreview'
import { siteMetadata } from '@/lib/metadata'
import { getPublishedPosts } from '@/lib/posts'

export default function Home() {
  const posts = getPublishedPosts()

  return (
    <>
      <section className="mx-auto mb-40 mt-24 max-w-5xl md:my-60">
        <h1 className="mb-4 text-main-heading font-extrabold uppercase leading-tight">
          ochuko ekrresa
        </h1>
        <p className="max-w-4xl text-gray-800 dark:text-port-100 sm:text-lg">
          Hi, my name is Ochuko and this is my digital garden. Over the years, I have learned a lot
          while working on interesting projects, and I want to share that knowledge with you.
        </p>

        <div className="mt-6 flex gap-6 dark:text-port-100">
          <a
            href={siteMetadata.github}
            className="relative uppercase before:absolute before:-bottom-0.5 before:left-0 before:block before:h-1 before:w-full before:origin-top before:scale-y-50 before:bg-rose-400 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-y-75 dark:before:bg-cyan-300"
          >
            github
          </a>
          <a
            href={siteMetadata.linkedin}
            className="relative uppercase before:absolute before:-bottom-0.5 before:left-0 before:block before:h-1 before:w-full before:origin-top before:scale-y-50 before:bg-rose-400 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-y-75 dark:before:bg-cyan-300"
          >
            linkedin
          </a>
        </div>
      </section>

      <section>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {posts.map(post => (
            <PostPreview key={post.url} post={post} />
          ))}
        </ul>
      </section>
    </>
  )
}
