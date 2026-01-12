import type { Metadata, ResolvingMetadata } from 'next'
import { generateProductMetadata } from '@/lib/seo-helpers'

interface Props {
  params: { id: string }
}

// Mock function - replace with your actual API call
async function fetchProduct(id: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const products = {
    '1': {
      id: '1',
      name: 'Premium Wireless Headphones',
      description:
        'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals who need focus.',
      price: 299.99,
      inStock: true,
      tags: ['headphones', 'wireless', 'audio', 'tech', 'electronics'],
      images: [
        {
          url: '/images/headphones.jpg',
          width: 1200,
          height: 630,
          alt: 'Premium Wireless Headphones with noise cancellation',
        },
      ],
      category: 'Electronics',
      brand: 'AudioTech',
      features: [
        'Noise Cancellation',
        '30-hour Battery',
        'Wireless Charging',
        'Voice Assistant',
      ],
    },
    '2': {
      id: '2',
      name: 'Organic Cotton T-Shirt',
      description:
        'Comfortable organic cotton t-shirt available in multiple colors and sizes. Ethically produced and environmentally friendly.',
      price: 29.99,
      inStock: true,
      tags: ['clothing', 't-shirt', 'organic', 'fashion', 'cotton'],
      images: [
        {
          url: '/images/tshirt.jpg',
          width: 1200,
          height: 630,
          alt: 'Organic Cotton T-Shirt in various colors',
        },
      ],
      category: 'Clothing',
      brand: 'EcoWear',
      features: [
        '100% Organic Cotton',
        'Ethically Produced',
        'Multiple Colors',
        'Eco-Friendly',
      ],
    },
    '3': {
      id: '3',
      name: 'Professional Camera Lens',
      description:
        'High-performance camera lens for professional photographers. Crystal clear optics and durable construction.',
      price: 1299.99,
      inStock: false,
      tags: ['camera', 'lens', 'photography', 'professional'],
      images: [
        {
          url: '/images/camera-lens.jpg',
          width: 1200,
          height: 630,
          alt: 'Professional Camera Lens for DSLR cameras',
        },
      ],
      category: 'Photography',
      brand: 'PhotoPro',
      features: [
        'Weather Sealed',
        'Image Stabilization',
        'Fast Autofocus',
        'Professional Grade',
      ],
    },
  }

  return products[id as keyof typeof products] || null
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await fetchProduct(params.id)

  if (!product) {
    return generateProductMetadata({
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
      noIndex: true,
    })
  }

  return generateProductMetadata({
    title: `${product.name} - ${product.brand}`,
    description: product.description,
    keywords: product.tags,
    image: product.images,
    price: product.price,
    inStock: product.inStock,
    brand: product.brand,
    category: product.category,
    canonical: `/products/${params.id}`,
  })
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProduct(params.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <span className="text-gray-400">/</span>
            <a
              href="/products"
              className="hover:text-blue-600 transition-colors"
            >
              Products
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>

          {/* Product Content */}
          <article
            itemScope
            itemType="https://schema.org/Product"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <meta itemProp="mpn" content={product.id} />
            <meta itemProp="brand" content={product.brand} />

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    itemProp="image"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-50 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <header>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <h1
                    itemProp="name"
                    className="text-3xl font-bold text-gray-900 mb-2"
                  >
                    {product.name}
                  </h1>

                  <div className="flex items-center space-x-4 mb-4">
                    <span
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <meta itemProp="priceCurrency" content="USD" />
                      <span
                        itemProp="price"
                        className="text-3xl font-bold text-green-600"
                      >
                        ${product.price}
                      </span>
                      <meta
                        itemProp="availability"
                        content={
                          product.inStock
                            ? 'https://schema.org/InStock'
                            : 'https://schema.org/OutOfStock'
                        }
                      />
                    </span>
                    <span className="text-sm text-gray-500">
                      by {product.brand}
                    </span>
                  </div>
                </header>

                {/* Product Description */}
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h2>
                  <p
                    itemProp="description"
                    className="text-gray-700 leading-relaxed"
                  >
                    {product.description}
                  </p>
                </section>

                {/* Product Features */}
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Features
                  </h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-sm text-gray-700"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Add to Cart Section */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      disabled={!product.inStock}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                        product.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Product Details */}
            <div className="border-t border-gray-200 p-8 bg-gray-50">
              <div className="grid md:grid-cols-3 gap-8">
                <section>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Shipping Info
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Free shipping on orders over $50</li>
                    <li>2-3 business days delivery</li>
                    <li>30-day return policy</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Product Details
                  </h3>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-gray-700">SKU</dt>
                      <dd className="text-gray-600">{product.id}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700">Brand</dt>
                      <dd className="text-gray-600">{product.brand}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700">Category</dt>
                      <dd className="text-gray-600">{product.category}</dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-3">Warranty</h3>
                  <p className="text-sm text-gray-700">
                    2-year manufacturer warranty included. Free support and
                    replacement for defective items.
                  </p>
                </section>
              </div>
            </div>
          </article>

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org/',
                '@type': 'Product',
                name: product.name,
                description: product.description,
                image: product.images.map(
                  (img) => `https://yourdomain.com${img.url}`
                ),
                sku: product.id,
                brand: {
                  '@type': 'Brand',
                  name: product.brand,
                },
                offers: {
                  '@type': 'Offer',
                  price: product.price,
                  priceCurrency: 'USD',
                  priceValidUntil: new Date(
                    Date.now() + 365 * 24 * 60 * 60 * 1000
                  )
                    .toISOString()
                    .split('T')[0],
                  availability: product.inStock
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
                  url: `https://yourdomain.com/products/${params.id}`,
                  seller: {
                    '@type': 'Organization',
                    name: 'Your Store Name',
                  },
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  reviewCount: '124',
                },
              }),
            }}
          />
        </div>
      </div>
    </div>
  )
}
