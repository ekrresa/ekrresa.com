import { allPosts, type Post } from 'content-collections'

export type PostPreviewType = Pick<Post, 'date' | 'summary' | 'title' | 'url'>

export function getPostPaths() {
  const paths = allPosts
    .filter(post => post.published)
    .map(post => ({ params: { slug: post.url.split('/').at(-1)! } }))

  return paths
}

export function getPostBySlug(slug: string) {
  const post = allPosts.find(post => post.url.includes(slug))

  return post
}

export function getPublishedPosts(): PostPreviewType[] {
  const posts = allPosts
    .filter(post => post.published)
    .map(post => {
      return {
        title: post.title,
        summary: post.summary,
        date: post.date,
        url: post.url.split('/').at(-1)!,
      }
    })
    .sort((a, b) => {
      return b.date.localeCompare(a.date)
    })

  return posts
}
