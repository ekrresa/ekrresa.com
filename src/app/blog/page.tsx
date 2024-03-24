import { PostPreview } from '@/components/PostPreview'
import { getPublishedPosts } from '@/lib/posts'

export const metadata = { title: 'Blog – Ochuko Ekrresa: Software Engineer' }

export default function Blog() {
  const posts = getPublishedPosts()

  return (
    <section className="mt-12">
      <header>
        <h1 className="heading pl-2 text-center text-4xl font-bold capitalize">All Articles</h1>
        <p className="mt-2 text-center text-brand-950 dark:text-port-100 sm:text-lg">
          Articles about things I&#39;ve learned while working on interesting projects.
        </p>
      </header>

      <section className="mt-24">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {posts.map((post, index) => (
            <PostPreview
              key={post.url}
              className={index % 2 === 1 ? 'md:text-end' : ''}
              post={post}
            />
          ))}
        </ul>
      </section>
    </section>
  )
}
