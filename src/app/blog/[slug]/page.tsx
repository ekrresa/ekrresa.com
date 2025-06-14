import type { Metadata } from 'next'
import Link from 'next/link'
import { Code } from 'bright'
import { Undo2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeExternalLinks from 'rehype-external-links'

import { Comments } from '@/components/Comments'
import { parseDate } from '@/lib/date'
import { siteMetadata } from '@/lib/metadata'
import { getPostBySlug, getPostPaths } from '@/lib/posts'
import { CodeBlock } from './CodeBlock'

export async function generateStaticParams() {
  const paths = getPostPaths()

  return paths.map(path => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(props.params.slug)

  if (!post) {
    return {}
  }

  const ogImage = `${siteMetadata.siteUrl}/og?title=${post.title}`
  const postURL = `${siteMetadata.siteUrl}/blog${post.url.split('/posts').at(-1)}`

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: postURL,
    },
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      images: [ogImage],
      url: postURL,
      type: 'article',
      authors: [siteMetadata.author],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  }
}

export default function Article({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return <div>Not found</div>
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: post.jsonLDStructure }}
      ></script>
      <article className="prose prose-slate mx-auto mt-12 dark:prose-invert md:prose-lg prose-h1:leading-tight prose-p:text-brand-950 prose-li:marker:text-brand-800 dark:prose-p:text-port-100 dark:prose-li:marker:text-port-200 md:mt-28">
        <header className="mb-16 border-b-2 border-brand-900 dark:border-smoke-100">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 pb-2 !text-brand-800 no-underline dark:!text-port-50"
          >
            <Undo2 className="transition-all group-hover:text-2xl" size={22} />

            <p className="text-sm font-medium">Back to all articles</p>
          </Link>

          <h1 className="!my-0 bg-gradient-to-r from-brand-800 to-brand-900 bg-clip-text text-transparent dark:from-linen-50 dark:to-linen-100">
            {post.title}
          </h1>

          <p className="!mb-4 text-base">
            Published on <time dateTime={post.date}>{parseDate(post.date)}</time>
          </p>
        </header>

        <ReactMarkdown
          components={{
            code: props => {
              const { children, className, node, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')

              if (match) {
                return (
                  <Code
                    //@ts-expect-error line-number-color
                    style={{ '--line-number-color': '#6272A4' }}
                    lang="ts"
                    theme="dracula"
                    lineNumbers
                  >
                    {String(children).replace(/\n$/, '')}
                  </Code>
                )
              }

              return (
                <code className="rounded-lg border border-rose-100 bg-rose-100 px-1 py-0.5 font-normal text-willow-700 dark:border-rose-100/30 dark:bg-[#151e29] dark:text-rose-200">
                  {children}
                </code>
              )
            },
            pre: CodeBlock,
          }}
          rehypePlugins={[[rehypeExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }]]}
        >
          {post.content}
        </ReactMarkdown>

        <div className="mt-20">
          <Comments />
        </div>
      </article>
    </section>
  )
}
