import type { Metadata } from 'next'
import Image from 'next/image'

import { getProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects - Ochuko Ekrresa – Software Engineer, Developer, Writer',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function Projects() {
  const projects = getProjects()

  return (
    <section className="mt-16">
      <header>
        <h1 className="heading text-center text-4xl font-bold capitalize">Projects</h1>
      </header>

      <section className="mt-24">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(21rem,1fr))] gap-x-10 gap-y-16">
          {projects.map((project, index) => (
            <a
              href={project.link}
              key={index}
              className="overflow-hidden rounded-lg border transition-all duration-200 hover:scale-[102%] hover:shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="h-[200px] object-cover"
                width={600}
                height={200}
                src={project.image}
                alt={project.title}
                priority
              />

              <div className="p-4">
                <h2 className="heading mb-2 inline-block bg-gradient-to-r text-xl font-bold">
                  {project.title}
                </h2>
                <p className="mb-4">{project.summary}</p>

                <ul className="flex flex-wrap gap-4">
                  {project.stack.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm font-medium uppercase text-smoke-700 dark:text-port-50"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </ul>
      </section>
    </section>
  )
}
