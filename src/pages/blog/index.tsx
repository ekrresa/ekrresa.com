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
      <section className="mt-16">
        <header>
          <h1 className="pl-8 text-4xl font-bold uppercase">Blog</h1>
        </header>

        <section className="mt-24">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {posts.map(post => (
              <PostPreview key={post.url} post={post} />
            ))}
          </ul>
        </section>
      </section>
    </Seo>
  )
}
