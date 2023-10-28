import axios from 'axios'

import { PostContent } from './utils'

const HASHNODE_API_TOKEN = process.env.HASHNODE_API_TOKEN
const HASHNODE_PUBLICATION_ID = process.env.HASHNODE_PUBLICATION_ID

export async function createArticleOnHashnode(post: PostContent) {
  const { content, filename, metadata } = post

  return await axios
    .post(
      'https://api.hashnode.com',
      {
        query: `mutation createPublicationStory($input: CreateStoryInput!, $publicationId: String!) {
          createPublicationStory(
            input: $input
            publicationId: $publicationId
            hideFromHashnodeFeed: false
          ) {
            post {
              _id
            }
          }
        }`,
        variables: {
          publicationId: HASHNODE_PUBLICATION_ID,
          input: {
            title: metadata.title,
            subtitle: metadata.summary,
            contentMarkdown: content,
            tags: [],
            slug: filename,
            isRepublished: {
              originalArticleURL: `https://www.ekrresa.com/blog/${filename}`,
            },
            isPartOfPublication: {
              publicationId: HASHNODE_PUBLICATION_ID,
            },
            sourcedFromGithub: false,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: HASHNODE_API_TOKEN,
        },
      },
    )
    .then(response => {
      if (response.data?.errors) {
        throw new Error(
          `Error occurred while updating hashnode post: ${response.data.errors[0].message}`,
        )
      }

      return { hashnode: response.data.data.createPublicationStory.post._id as string }
    })
}
