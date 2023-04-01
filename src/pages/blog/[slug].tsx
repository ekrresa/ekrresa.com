import * as React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
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
      <article className="prose-[#162027] prose-p:text-brand-[#162027] prose mx-auto mt-12 dark:prose-invert lg:prose-xl prose-headings:text-brand-800 prose-h1:!leading-tight prose-a:font-medium prose-a:text-[#a13434] prose-a:no-underline prose-a:decoration-[3px] prose-a:transition-all hover:prose-a:underline hover:prose-a:underline-offset-[3px] prose-blockquote:border-l-brand-700 prose-blockquote:bg-red-100 prose-blockquote:py-[0.1rem] prose-blockquote:not-italic prose-code:rounded prose-code:bg-gray-200 prose-li:marker:text-[#162027] md:mt-28">
        <header className="mb-24 border-b-2 border-smoke-100">
          <h1 className="!mb-0">{post.title}</h1>

          <p className="relative text-base text-[#162027]/90">
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
