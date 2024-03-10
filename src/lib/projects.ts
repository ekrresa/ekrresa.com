import { allProjects } from '~/.contentlayer/generated'

export function getProjects() {
  return allProjects.filter(project => !project.archived).sort((a, b) => a.order - b.order)
}
