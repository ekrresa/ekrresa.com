import Link from 'next/link'

import { parseDate } from '@/lib/date'
import { type Post } from '~/.contentlayer/generated'

type PostPreviewType = Pick<Post, 'date' | 'summary' | 'title' | 'url'>

interface Props {
  post: PostPreviewType
}
export function PostPreview(props: Props) {
  const { post } = props

  return (
    <Link
      href={`/blog/${post.url}`}
      key={post.url}
      className="rounded-lg transition-all duration-500 hover:-translate-y-2"
    >
      <li>
        <p className="mb-1 text-sm text-smoke-700 dark:text-port-50">
          {parseDate(post.date)}
        </p>

        <h3 className="heading mb-4 inline-block bg-gradient-to-r text-3xl font-bold">
          {post.title}
        </h3>

        <p className="leading-6 text-smoke-700 dark:text-port-50">{post.summary}</p>
      </li>
    </Link>
  )
}
