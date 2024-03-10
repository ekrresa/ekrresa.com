import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `./posts/**/*.md`,
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      required: true,
    },
    updatedAt: {
      type: 'date',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/${post._raw.flattenedPath}`,
    },
    jsonLDStructure: {
      type: 'object',
      resolve: post => {
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.summary,
          image: `https://www.ekrresa.com/og?title=${post.title}`,
          datePublished: new Date(post.date).toISOString(),
          url: `https://www.ekrresa.com/blog/${post._raw.flattenedPath}`,
          author: [
            {
              '@type': 'Person',
              name: 'Ochuko Ekrresa',
            },
          ],
        }
      },
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `./projects/**/*.md`,
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    link: {
      type: 'string',
      required: true,
    },
    stack: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    order: {
      type: 'number',
      required: true,
    },
    archived: {
      type: 'boolean',
      required: true,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project],
})
