import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
  name: 'posts',
  directory: './content/posts',
  include: '**/*.md',
  schema: z => ({
    title: z.string(),
    summary: z.string(),
    tags: z.string().array(),
    date: z.string(),
    published: z.boolean(),
    updatedAt: z.string().nullable(),
  }),
  transform(post) {
    return {
      ...post,
      url: `/posts/${post._meta.path.replace('.js', '')}`,
      jsonLDStructure: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        image: `https://www.ekrresa.com/og?title=${post.title}`,
        datePublished: new Date(post.date).toISOString(),
        url: `https://www.ekrresa.com/blog/${post._meta.fileName}`,
        author: [
          {
            '@type': 'Person',
            name: 'Ochuko Ekrresa',
          },
        ],
      },
    }
  },
})

const projects = defineCollection({
  name: 'projects',
  directory: './content/projects',
  include: '**/*.md',
  schema: z => ({
    title: z.string(),
    image: z.string(),
    summary: z.string(),
    link: z.string(),
    stack: z.string().array(),
    order: z.number(),
    archived: z.boolean().nullable(),
  }),
})

export default defineConfig({
  collections: [posts, projects],
})
