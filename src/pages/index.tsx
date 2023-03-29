import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Post, allPosts } from 'contentlayer/generated'
import dayjs from 'dayjs'

import { Layout } from '@/components/Layout'
import { parseDate } from '@/lib/date'
import { siteMetadata } from '@/lib/metadata'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home(props: Props) {
  const { posts } = props

  return (
    <Layout>
      <section className="mt-32 md:mt-48 md:px-12 md:pb-12">
        <p className="ml-1 text-xl font-semibold uppercase text-brand-700/80">
          ochuko ekrresa
        </p>
        <h1 className="mb-4 bg-gradient-to-r from-brand-500  to-brand-800 bg-clip-text text-7xl font-semibold uppercase leading-none text-transparent md:text-[4.8rem]">
          software engineer
        </h1>
        <p className="max-w-2xl text-lg text-brand-900/90">
          Hi, my name is Ochuko and this is my digital garden. I&apos;ve learnt a lot over
          the years working on interesting projects and I share my knowledge here.
        </p>

        <div className="mt-6 flex gap-6 text-brand-900/90">
          <a
            href={siteMetadata.github}
            className="uppercase underline decoration-[#df7373] decoration-[3px] underline-offset-[3px]"
          >
            github
          </a>
          <a
            href={siteMetadata.linkedin}
            className="uppercase underline decoration-[#df7373] decoration-[3px] underline-offset-[3px]"
          >
            linkedin
          </a>
        </div>
      </section>

      <section className="mt-32 md:mt-48">
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
    </Layout>
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
