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
      className="rounded-lg transition-shadow hover:shadow-post hover:shadow-smoke-100 md:px-3 md:py-4"
    >
      <li>
        <p className="mb-1 text-sm text-smoke-600/90">{parseDate(post.date)}</p>

        <h3 className="mb-2 inline-block text-2xl font-semibold text-brand-900/90">
          {post.title}
        </h3>

        <p className="leading-6 text-smoke-700">{post.summary}</p>
      </li>
    </Link>
  )
}
