import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { PostPreview } from '@/components/PostPreview'
import { Seo } from '@/components/Seo'
import { siteMetadata } from '@/lib/metadata'
import { PostPreviewType, getPublishedPosts } from '@/lib/posts'

export const getStaticProps: GetStaticProps<{ posts: PostPreviewType[] }> = async () => {
  const posts = getPublishedPosts()

  return { props: { posts } }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Blog(props: Props) {
  const { posts } = props

  return (
    <Seo
      title="Blog – Ochuko Ekrresa: Software Engineer"
      description={siteMetadata.description}
      image={siteMetadata.socialBanner}
    >
      <section className="mt-12">
        <header>
          <h1 className="heading pl-2 text-center text-4xl font-bold uppercase">Blog</h1>
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
    </Seo>
  )
}
