import { Metadata } from 'next'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import { Comments } from '@/components/Comments'
import { parseDate } from '@/lib/date'
import { siteMetadata } from '@/lib/metadata'
import { getPostBySlug, getPostPaths } from '@/lib/posts'
import { CodeBlock } from './CodeBlock'
import { CodeHighlighter } from './CodeHighlighter'

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
        <header className="mb-16 border-b-2 border-brand-800 dark:border-smoke-100">
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

          <p className="text-base">
            Published on <time dateTime={post.date}>{parseDate(post.date)}</time>
          </p>
        </header>

        <ReactMarkdown
          linkTarget="_blank"
          components={{
            code: props => {
              return <CodeHighlighter {...props} />
            },
            pre: CodeBlock,
          }}
        >
          {post.body.raw}
        </ReactMarkdown>

        <div className="mt-20">
          <Comments />
        </div>
      </article>
    </section>
  )
}
