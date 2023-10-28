import axios from 'axios'

import { PostContent } from './utils'

const DEV_TO_API_TOKEN = process.env.DEV_TO_API_TOKEN

export async function createArticleOnDevTo(post: PostContent) {
  const { content, filename, metadata } = post

  return await axios
    .post<DEV_TO_RESPONSE>(
      'https://dev.to/api/articles',
      {
        article: {
          title: metadata.title,
          published: false,
          body_markdown: content,
          description: metadata.summary,
          tags: metadata.tags,
          canonical_url: `https://www.ekrresa.com/blog/${filename}`,
        },
      },
      {
        headers: {
          accept: 'application/vnd.forem.api-v1+json',
          'api-key': DEV_TO_API_TOKEN,
          'content-type': 'application/json',
        },
      },
    )
    .then(response => {
      return { devTo: response.data.id }
    })
}

type DEV_TO_RESPONSE = {
  id: number
  title: string
  description: string
}
