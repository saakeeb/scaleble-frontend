import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { defaultMetadata } from '@/lib/seo-helpers'

const inter = Inter({ subsets: ['latin'] })

// Global layout metadata
export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'My Next.js App',
    template: '%s | My Next.js App',
  },
  description: 'A high-performance Next.js application with best practices',
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: 'en_US',
    siteName: 'My Next.js App',
    type: 'website',
    url: 'https://yourdomain.com',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle',
    site: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  )
}
