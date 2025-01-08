import Link from 'next/link'

import { parseDate } from '@/lib/date'
import { type Post } from '~/.content-collections/generated'

type PostPreviewType = Pick<Post, 'date' | 'summary' | 'title' | 'url'>

interface Props extends React.ComponentProps<'div'> {
  post: PostPreviewType
}
export function PostPreview(props: Props) {
  const { post } = props

  return (
    <li key={post.url} className="rounded-lg transition-all duration-200">
      <Link href={`/blog/${post.url}`} className="group flex h-full flex-col items-start gap-2">
        <time className="text-sm font-medium text-brand-950 dark:text-port-100">
          {parseDate(post.date)}
        </time>

        <h2 className="mb-2 text-2xl font-bold text-brand-900 dark:text-linen-50 sm:text-3xl">
          {post.title}
        </h2>

        <p className="mb-3 text-brand-950 dark:text-port-100 sm:text-lg">{post.summary}</p>

        <button
          className={`before:scale-x-1 relative mt-auto text-sm font-medium text-rose-600 before:absolute before:-bottom-0.5 before:left-0 before:block before:h-0.5 before:w-full before:origin-left before:scale-x-100 before:bg-rose-500 before:transition-transform before:duration-300 before:content-[""] group-hover:before:scale-x-100 dark:text-cyan-300 dark:before:bg-cyan-300 sm:before:scale-x-0`}
        >
          Read article
        </button>
      </Link>
    </li>
  )
}
