import { createArticleOnDevTo } from './dev.to'
import { createArticleOnHashnode } from './hashnode'
import { createArticleOnMedium } from './medium'
import {
  checkIfPostIsPublished,
  getMarkdownChangedFiles,
  getPostByFilePath,
  saveLastPublishCommit,
  savePostIds,
} from './utils'

async function publishArticle() {
  const changedFiles = await getMarkdownChangedFiles()

  if (changedFiles.length === 0) return

  const posts = changedFiles
    .map(filepath => {
      const post = getPostByFilePath(filepath)

      if (post.metadata.published) {
        return post
      }
    })
    .filter(Boolean)

  if (posts.length === 0) return

  const publishPostsPromise = posts.map(async post => {
    const isPostPublished = await checkIfPostIsPublished(post.filename)

    if (isPostPublished) return

    const devToResult = createArticleOnDevTo(post)

    const hashnodeResult = createArticleOnHashnode(post)

    const mediumResult = createArticleOnMedium(post)

    const result = await Promise.allSettled([devToResult, hashnodeResult, mediumResult])

    const payload = {}

    result.forEach(result => {
      if (result.status === 'fulfilled') {
        Object.assign(payload, result.value)
      } else {
        console.error(result.reason)
      }
    })

    savePostIds(post.filename, payload)
  })

  await Promise.allSettled(publishPostsPromise)

  await saveLastPublishCommit()
}

publishArticle()
  .then(() => {
    console.log('SUCCESS')
  })
  .catch(error => {
    console.error('ERROR', error)
    process.exit(1)
  })
