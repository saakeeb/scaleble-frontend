import type { Metadata } from 'next'

type OpenGraphType = 'website' | 'article' | 'profile'

interface BaseSEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?:
    | string
    | { url: string; width?: number; height?: number; alt?: string }[]
  noIndex?: boolean
  canonical?: string
}

interface WebsiteSEOConfig extends BaseSEOConfig {
  type?: 'website'
}

interface ArticleSEOConfig extends BaseSEOConfig {
  type: 'article'
  publishedTime: string
  author: string
  tags: string[]
}

interface ProfileSEOConfig extends BaseSEOConfig {
  type: 'profile'
  username: string
}

type SEOConfig = WebsiteSEOConfig | ArticleSEOConfig | ProfileSEOConfig

export function generateSEO(config: SEOConfig): Metadata {
  // Normalize images array
  let images:
    | { url: string; width?: number; height?: number; alt?: string }[]
    | undefined

  if (Array.isArray(config.image)) {
    images = config.image
  } else if (config.image) {
    images = [{ url: config.image }]
  } else {
    images = undefined
  }

  const openGraphImages = images?.map((img) =>
    typeof img === 'string' ? { url: img } : img
  )

  // Create base openGraph object
  const openGraph = {
    title: config.title,
    description: config.description,
    images: openGraphImages,
    type: config.type || ('website' as const),
  }

  // Add type-specific properties
  if (config.type === 'article') {
    Object.assign(openGraph, {
      publishedTime: config.publishedTime,
      authors: [config.author],
      tags: config.tags,
    })
  } else if (config.type === 'profile') {
    Object.assign(openGraph, {
      username: config.username,
    })
  }

  // Construct metadata
  const metadata: Metadata = {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    robots: config.noIndex ? 'noindex, nofollow' : undefined,
    alternates: config.canonical ? { canonical: config.canonical } : undefined,
    openGraph,
    twitter: {
      title: config.title,
      description: config.description,
      images: openGraphImages?.map((img) => img.url),
      card: 'summary_large_image',
    },
  }

  return metadata
}

export type { SEOConfig, WebsiteSEOConfig, ArticleSEOConfig, ProfileSEOConfig }
