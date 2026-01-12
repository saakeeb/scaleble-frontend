import { generateSEO, type SEOConfig } from './seo'
import type { Metadata } from 'next'

/**
 * Helper to merge page-specific SEO with layout defaults
 */
export function mergeMetadata(
  pageMetadata: Metadata,
  layoutDefaults: Metadata = {}
): Metadata {
  return {
    ...layoutDefaults,
    ...pageMetadata,
    openGraph: {
      ...layoutDefaults.openGraph,
      ...pageMetadata.openGraph,
    },
    twitter: {
      ...layoutDefaults.twitter,
      ...pageMetadata.twitter,
    },
    robots: pageMetadata.robots || layoutDefaults.robots,
    alternates: pageMetadata.alternates || layoutDefaults.alternates,
  }
}

/**
 * Default metadata for the entire application
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

/**
 * Helper for generating metadata with defaults
 */
export function generatePageMetadata(config: SEOConfig): Metadata {
  const pageSEO = generateSEO(config)
  return mergeMetadata(pageSEO, defaultMetadata)
}

/**
 * Product-specific SEO generator
 */
interface ProductSEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?:
    | string
    | { url: string; width?: number; height?: number; alt?: string }[]
  price?: number
  currency?: string
  inStock?: boolean
  brand?: string
  category?: string
  canonical?: string
  noIndex?: boolean
}

export function generateProductMetadata(config: ProductSEOConfig): Metadata {
  const baseMetadata = generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    image: config.image,
    canonical: config.canonical,
    noIndex: config.noIndex,
  })

  // Product-specific meta tags
  const productMetaTags: Record<string, string> = {}

  if (config.price !== undefined) {
    productMetaTags['og:price:amount'] = config.price.toString()
    productMetaTags['og:price:currency'] = config.currency || 'USD'
    productMetaTags['product:price:amount'] = config.price.toString()
    productMetaTags['product:price:currency'] = config.currency || 'USD'
  }

  if (config.inStock !== undefined) {
    productMetaTags['og:availability'] = config.inStock
      ? 'in stock'
      : 'out of stock'
    productMetaTags['product:availability'] = config.inStock
      ? 'in stock'
      : 'out of stock'
  }

  if (config.brand) {
    productMetaTags['og:brand'] = config.brand
    productMetaTags['product:brand'] = config.brand
  }

  if (config.category) {
    productMetaTags['product:category'] = config.category
  }

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      // Use 'website' type for products since 'product' is not a valid OpenGraph type
      type: 'website',
    },
    other: {
      ...baseMetadata.other,
      ...productMetaTags,
    },
  }
}
