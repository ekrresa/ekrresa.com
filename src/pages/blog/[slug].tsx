import * as React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { FaHandPointLeft } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

import { Comments } from '@/components/Comments'
import { Seo } from '@/components/Seo'
import { parseDate } from '@/lib/date'
import { siteMetadata } from '@/lib/metadata'
import { getPostBySlug, getPostPaths } from '@/lib/posts'
import { type Post } from '~/.contentlayer/generated'

const siteDomain = process.env.VERCEL_URL || siteMetadata.siteUrl

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Article(props: Props) {
  const { post } = props

  const ogImageUrl = `${siteDomain}/api/og?title=${post.title}`

  return (
    <Seo title={post.title} description={post.summary} image={ogImageUrl}>
      <article className="prose prose-slate mx-auto mt-12 dark:prose-invert md:prose-lg lg:prose-xl prose-h1:leading-tight prose-li:marker:text-brand-800 dark:prose-p:text-port-100 dark:prose-li:marker:text-port-200 md:mt-28">
        <header className="mb-24 border-b-2 border-brand-800 dark:border-smoke-100">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-4 pb-2 no-underline "
          >
            <FaHandPointLeft className="fill-slate-600 text-lg transition-all group-hover:text-2xl dark:fill-port-200" />

            <p className="text-sm font-medium text-slate-500 dark:text-port-200">
              Back to all articles
            </p>
          </Link>

          <h1 className="!my-0">{post.title}</h1>

          <p className="text-base">
            Published on <time dateTime={post.date}>{parseDate(post.date)}</time>
          </p>
        </header>

        <ReactMarkdown
          linkTarget="_blank"
          components={{
            code: ({ node, inline, className, children, ...props }: any) => {
              return !inline ? (
                <SyntaxHighlighter
                  language="typescript"
                  showLineNumbers
                  style={dracula}
                  PreTag="div"
                  customStyle={{ background: 'transparent', padding: 0, fontWeight: 400 }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {post.body.raw}
        </ReactMarkdown>

        <div className="mt-20">
          <Comments />
        </div>
      </article>
    </Seo>
  )
}

export const getStaticProps: GetStaticProps<{ post: Post }> = context => {
  const post = getPostBySlug(context.params?.slug as string)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return { props: { post } }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getPostPaths()

  return { paths, fallback: false }
}
