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
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
})
