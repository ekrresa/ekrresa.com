import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import dayjs from 'dayjs'

import { Seo } from '@/components/Seo'
import { parseDate } from '@/lib/date'
import { siteMetadata } from '@/lib/metadata'
import { Post, allPosts } from '~/.contentlayer/generated'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Blog(props: Props) {
  const { posts } = props

  return (
    <Seo
      title="Blog – Ochuko Ekrresa: Software Engineer"
      description={siteMetadata.description}
      image={siteMetadata.socialBanner}
    >
      <section className="mt-16">
        <header>
          <h1 className="text-4xl font-bold uppercase pl-8">Blog</h1>
        </header>

        <section className="mt-24">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {posts.map(post => (
              <Link
                href={`/blog/${post.url}`}
                key={post.url}
                className="hover:shadow-post hover:shadow-smoke-100 md:px-3 md:py-4 transition-shadow rounded-lg"
              >
                <li>
                  <p className="mb-1 text-sm text-smoke-600/90">{parseDate(post.date)}</p>

                  <h3 className="font-semibold mb-2 inline-block text-2xl text-brand-900/90 hover:text-brand-900 transition-colors">
                    {post.title}
                  </h3>

                  <p className="leading-6 text-smoke-700">{post.summary}</p>
                </li>
              </Link>
            ))}
          </ul>
        </section>
      </section>
    </Seo>
  )
}

type PostPreview = Pick<Post, 'date' | 'summary' | 'title' | 'url'>

export const getStaticProps: GetStaticProps<{ posts: PostPreview[] }> = async () => {
  const posts = allPosts
    .filter(post => post.published)
    .map(post => {
      return {
        title: post.title,
        summary: post.summary,
        date: post.date,
        url: post.url.split('/').at(-1)!,
      }
    })
    .sort((a, b) => {
      return Number(dayjs(a.date).isBefore(b.date))
    })

  return { props: { posts } }
}
