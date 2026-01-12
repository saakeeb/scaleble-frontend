# songly-landing

my-app/
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── images/
│       ├── og-image.jpg
│       └── products/
│
├── src/
│   ├── app/                          # App Router (Next.js 15)
│   │   ├── (auth)/                   # Route groups
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (marketing)/              # Marketing pages group
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── admin/                    # Admin routes
│   │   ├── api/                      # API routes
│   │   │   └── products/
│   │   │       └── route.ts
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   ├── globals.css
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── loading.tsx               # Loading component
│   │   ├── error.tsx                 # Error boundary
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # Base UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── navigation.tsx
│   │   │
│   │   ├── forms/                    # Form components
│   │   │   ├── contact-form.tsx
│   │   │   ├── newsletter-signup.tsx
│   │   │   └── search-form.tsx
│   │   │
│   │   ├── products/                 # Product-specific components
│   │   │   ├── product-card.tsx
│   │   │   ├── product-grid.tsx
│   │   │   └── product-image.tsx
│   │   │
│   │   └── blog/                     # Blog components
│   │       ├── blog-card.tsx
│   │       └── featured-posts.tsx
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── utils.ts                  # General utilities
│   │   ├── seo.ts                    # SEO helpers
│   │   ├── api.ts                    # API client
│   │   ├── auth.ts                   # Authentication utilities
│   │   ├── validations.ts            # Form validations
│   │   └── constants.ts              # App constants
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-local-storage.ts
│   │   ├── use-debounce.ts
│   │   ├── use-products.ts
│   │   └── use-auth.ts
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── api.ts
│   │   └── index.ts                  # Barrel export
│   │
│   ├── styles/                       # Additional styles
│   │   ├── globals.css
│   │   └── components.css
│   │
│   └── utils/                        # Pure utility functions
│       ├── format.ts                 # Formatting utilities
│       ├── helpers.ts                # Helper functions
│       └── validators.ts             # Validation functions
│
├── .env.local                        # Environment variables
├── .env.example                      # Example env file
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── package.json
└── README.md
# scaleble-frontend
