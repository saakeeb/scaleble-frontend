import { generatePageMetadata } from '@/lib/seo-helpers'
import type { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata({
  title: 'Home - My Next.js App',
  description:
    'Welcome to our high-performance Next.js application built with modern best practices and SEO optimization.',
  keywords: ['nextjs', 'react', 'typescript', 'web development'],
  image: '/og-home.jpg',
  canonical: 'https://yourdomain.com',
})

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
      <p className="text-lg text-muted-foreground">
        This is a high-performance Next.js application with optimized SEO.
      </p>
    </main>
  )
}
