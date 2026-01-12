import { generatePageMetadata } from '@/lib/seo-helpers'
import type { Metadata } from 'next'

// Mock data function - replace with your CMS/data source
async function getPost(slug: string) {
  const posts = {
    'first-post': {
      title: 'Getting Started with Next.js',
      excerpt:
        'Learn how to build modern web applications with Next.js 14 and React.',
      content: '...',
      publishedAt: '2024-01-15T10:00:00Z',
      author: 'John Doe',
      tags: ['nextjs', 'react', 'tutorial'],
      image: '/blog/first-post.jpg',
    },
  }
  return posts[slug as keyof typeof posts] || null
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return generatePageMetadata({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      noIndex: true,
    })
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    type: 'article',
    publishedTime: post.publishedAt,
    author: post.author,
    tags: post.tags,
    image: post.image,
    canonical: `https://yourdomain.com/blog/${params.slug}`,
  })
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
        </div>
      </header>
      <div className="prose prose-lg max-w-none">
        <p>{post.content}</p>
      </div>
    </article>
  )
}
