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
      <section className="mt-32 md:mt-48 md:pb-12 md:pl-8">
        <p className="text-xl font-semibold uppercase text-brand-600 dark:text-port-50">
          ochuko ekrresa
        </p>
        <h1 className="heading -ml-1 mb-4 text-[4rem] font-semibold uppercase leading-none md:text-[4.8rem]">
          software engineer
        </h1>
        <p className="max-w-2xl text-lg text-brand-900/90 dark:text-port-100">
          Hi, my name is Ochuko and this is my digital garden. I&apos;ve learnt a lot over
          the years working on interesting projects and I share my knowledge here.
        </p>

        <div className="mt-6 flex gap-6 text-brand-900/90 dark:text-port-100">
          <a
            href={siteMetadata.github}
            className="uppercase underline decoration-sunglo-400 decoration-[3px] underline-offset-[3px] transition-all hover:underline-offset-[5px]"
          >
            github
          </a>
          <a
            href={siteMetadata.linkedin}
            className="uppercase underline decoration-sunglo-400 decoration-[3px] underline-offset-[3px] transition-all hover:underline-offset-[5px]"
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
