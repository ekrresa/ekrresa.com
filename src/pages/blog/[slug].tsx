import * as React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

import { Seo } from '@/components/Seo'
import { parseDate } from '@/lib/date'
import { siteMetadata } from '@/lib/metadata'
import { allPosts, type Post } from '~/.contentlayer/generated'

function renderers() {
  return {
    code: ({ node, inline, className, children, ...props }: any) => {
      return !inline ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          language="typescript"
          showLineNumbers
          style={dracula}
          PreTag="div"
          customStyle={{ background: 'transparent', padding: 0, fontWeight: 400 }}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Article(props: Props) {
  const { post } = props

  return (
    <Seo title={post.title} description={post.summary} image={siteMetadata.socialBanner}>
      <article className="mt-12 mx-auto md:mt-28 prose prose-[#162027] lg:prose-xl dark:prose-invert prose-h1:!leading-tight prose-headings:text-brand-800 prose-a:text-[#a13434] prose-a:no-underline hover:prose-a:underline hover:prose-a:underline-offset-[3px] prose-a:decoration-[3px] prose-a:transition-all prose-a:font-medium prose-blockquote:not-italic prose-blockquote:py-[0.1rem] prose-blockquote:bg-red-100 prose-li:marker:text-[#162027] prose-blockquote:border-l-brand-700 prose-code:bg-gray-200 prose-code:rounded prose-p:text-brand-[#162027]">
        <header className="mb-24 border-b-2 border-smoke-100">
          <h1 className="!mb-0">{post.title}</h1>

          <p className="relative text-base text-[#162027]/90">
            Published on <time dateTime={post.date}>{parseDate(post.date)}</time>
          </p>
        </header>

        <ReactMarkdown
          children={post.body.raw}
          linkTarget="_blank"
          components={renderers()}
          remarkPlugins={[remarkGfm]}
        />
      </article>
    </Seo>
  )
}

export const getStaticProps: GetStaticProps<{ post: Post }> = context => {
  const post = allPosts.find(post => post.url.includes(context.params?.slug as string))!

  return { props: { post } }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allPosts
    .filter(post => post.published)
    .map(post => ({ params: { slug: post.url.split('/').at(-1)! } }))

  return { paths, fallback: false }
}
