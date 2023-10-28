import axios from 'axios'

import { PostContent } from './utils'

const MEDIUM_API_TOKEN = process.env.MEDIUM_API_TOKEN
const USER_ID = '1d7f937df89f0ea2fd2e84cfd68fb79178c1711e40bba0fe271be56260cc3baa7'

export async function createArticleOnMedium(post: PostContent) {
  const { content, filename, metadata } = post

  return await axios
    .post<MEDIUM_RESPONSE>(
      `https://api.medium.com/v1/users/${USER_ID}/posts`,
      {
        title: metadata.title,
        publishStatus: 'draft',
        contentFormat: 'markdown',
        content,
        tags: metadata.tags,
        canonical_url: `https://www.ekrresa.com/blog/${filename}`,
      },
      {
        headers: {
          accept: 'application/vnd.forem.api-v1+json',
          'api-key': MEDIUM_API_TOKEN,
          'content-type': 'application/json',
        },
      },
    )
    .then(response => {
      return { medium: response.data.data.id }
    })
}

type MEDIUM_RESPONSE = {
  data: {
    id: string
    title: string
    authorId: string
  }
}
