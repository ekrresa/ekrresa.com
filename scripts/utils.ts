import { execSync } from 'child_process'
import fs from 'fs'
import { Redis } from '@upstash/redis'
import matter from 'gray-matter'

const redis = new Redis({
  url: process.env.CACHE_URL!,
  token: process.env.CACHE_TOKEN!,
})

export async function getMarkdownChangedFiles() {
  const lastPublishCommit = await redis.get<string>('LAST_PUBLISH_COMMIT')

  const command = `git diff ${lastPublishCommit} HEAD --name-only -- "***.md"`
  const diffOutput = execSync(command).toString()
  const markdownFolder = 'content/posts/'

  return diffOutput.split('\n').filter(file => file && file.includes(markdownFolder))
}

type FrontMatter = {
  date: string
  updatedAt: string | null
  summary: string
  tags: string[]
  title: string
  published: boolean
}

export function getPostByFilePath(filePath: string) {
  const file = fs.readFileSync(filePath)
  const { data, content } = matter(file)

  const markdownFolder = 'content/posts/'
  const filename = filePath.substring(markdownFolder.length, filePath.indexOf('.md'))

  return { content, filename, metadata: data as FrontMatter }
}

export type PostContent = ReturnType<typeof getPostByFilePath>

export async function savePostIds(slug: string, payload: Record<string, string>) {
  redis.set(`published:${slug}`, JSON.stringify(payload))
}

export async function saveLastPublishCommit() {
  const command = 'git rev-parse HEAD'
  const commit = execSync(command).toString()

  await redis.set('LAST_PUBLISH_COMMIT', commit)
}

export async function checkIfPostIsPublished(slug: string) {
  const post = await redis.get<string>(`published:${slug}`)

  if (!post) return false

  return true
}
