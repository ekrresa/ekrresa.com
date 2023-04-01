import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { PostPreview } from '@/components/PostPreview'
import { Seo } from '@/components/Seo'
import { siteMetadata } from '@/lib/metadata'
import { getPublishedPosts, type PostPreviewType } from '@/lib/posts'

export const getStaticProps: GetStaticProps<{ posts: PostPreviewType[] }> = async () => {
  const posts = getPublishedPosts()

  return { props: { posts } }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home(props: Props) {
  const { posts } = props

  return (
    <Seo
      title="Ochuko Ekrresa – Software Engineer, Frontend Developer, Writer"
      description={siteMetadata.description}
      image={siteMetadata.socialBanner}
    >
      <section className="mt-32 md:mt-48 md:px-12 md:pb-12">
        <p className="ml-1 text-xl font-semibold uppercase text-brand-700/80">
          ochuko ekrresa
        </p>
        <h1 className="mb-4 bg-gradient-to-r from-brand-600  to-brand-800 bg-clip-text text-7xl font-semibold uppercase leading-none text-transparent md:text-[4.8rem]">
          software engineer
        </h1>
        <p className="max-w-2xl text-lg text-brand-900/90">
          Hi, my name is Ochuko and this is my digital garden. I&apos;ve learnt a lot over
          the years working on interesting projects and I share my knowledge here.
        </p>

        <div className="mt-6 flex gap-6 text-brand-900/90">
          <a
            href={siteMetadata.github}
            className="uppercase underline decoration-[#df7373] decoration-[3px] underline-offset-[3px]"
          >
            github
          </a>
          <a
            href={siteMetadata.linkedin}
            className="uppercase underline decoration-[#df7373] decoration-[3px] underline-offset-[3px]"
          >
            linkedin
          </a>
        </div>
      </section>

      <section className="mt-32 md:mt-48">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {posts.map(post => (
            <PostPreview key={post.url} post={post} />
          ))}
        </ul>
      </section>
    </Seo>
  )
}
