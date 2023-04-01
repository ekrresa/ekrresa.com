import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { siteMetadata } from '@/lib/metadata'

interface Props {
  description: string
  title: string
  image: string
}

export function Seo({
  children,
  title,
  image,
  description,
}: React.PropsWithChildren<Props>) {
  const router = useRouter()
  const url = siteMetadata.siteUrl + router.asPath

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="follow, index" />

        <meta name="description" content={description} />
        {/* Open Graph */}
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="og:description" content={description} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content={siteMetadata.twitterHandle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:url" content={url} />
      </Head>

      {children}
    </>
  )
}
