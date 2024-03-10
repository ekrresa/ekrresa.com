import { PostPreview } from '@/components/PostPreview'
import { getPublishedPosts } from '@/lib/posts'

export const metadata = { title: 'Blog – Ochuko Ekrresa: Software Engineer' }

export default function Blog() {
  const posts = getPublishedPosts()

  return (
    <section className="mt-12">
      <header>
        <h1 className="heading pl-2 text-center text-4xl font-bold capitalize">All Articles</h1>
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
