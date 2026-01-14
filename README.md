# Dashboard Application

A modern, full-featured dashboard application built with Next.js 13+ (App Router), TypeScript, and Tailwind CSS. This project demonstrates best practices in authentication, data management, state persistence, and user experience.

## Features

### Authentication
- Simulated authentication system with login/logout functionality
- Protected routes with automatic redirection
- User session persistence using localStorage
- Role-based user system (admin/user)

### Data Management
- Mock API with realistic data fetching
- Server-side rendering with client-side revalidation
- Advanced search functionality with debounced input
- Multi-criteria filtering (status, priority, category)
- Pagination with configurable page sizes

### State Management
- URL-based state persistence for filters and pagination
- State restoration on page refresh and navigation
- Debounced search to optimize performance
- Form validation using Zod schemas

### User Experience
- Skeleton loaders for better perceived performance
- Comprehensive error handling with retry functionality
- Empty state displays with helpful messages
- Responsive design for all screen sizes
- Dark mode with system preference detection
- Smooth animations and transitions

### Accessibility
- Keyboard navigation support
- ARIA attributes for screen readers
- Semantic HTML structure
- Focus management for modals and dropdowns

## Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide React
- **Date Formatting:** date-fns

## Project Architecture

**Clean, senior-level architecture** with all source code organized under the `src/` directory.

```
src/
├── app/                        # Next.js 13+ App Router
│   ├── dashboard/
│   │   ├── layout.tsx         # Protected dashboard layout
│   │   └── page.tsx           # Main dashboard (optimized with memoization)
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── globals.css            # Global styles and Tailwind
│   ├── layout.tsx             # Root layout with providers
│   └── page.tsx               # Home page with auth-based redirection
│
├── components/
│   ├── auth/
│   │   ├── auth-provider.tsx  # Authentication context
│   │   └── protected-route.tsx # Route protection wrapper
│   ├── dashboard/
│   │   ├── data-pagination.tsx # Pagination (React.memo optimized)
│   │   ├── data-table.tsx      # Data display (memoized rows)
│   │   ├── empty-state.tsx     # Empty state UI
│   │   ├── error-display.tsx   # Error handling component
│   │   ├── filters.tsx         # Filter controls (memoized)
│   │   ├── header.tsx          # Dashboard header
│   │   ├── search-bar.tsx      # Search input (memoized)
│   │   └── table-skeleton.tsx  # Loading skeleton
│   ├── ui/                     # shadcn/ui component library
│   ├── theme-provider.tsx      # Theme context provider
│   └── theme-toggle.tsx        # Dark mode toggle
│
├── hooks/
│   ├── use-debounce.ts         # Custom debounce hook (500ms)
│   └── use-toast.ts            # Toast notifications hook
│
├── lib/
│   ├── auth.ts                 # Authentication logic
│   ├── mock-api.ts             # Mock API with filtering/pagination
│   ├── utils.ts                # Utility functions (cn helper)
│   └── validations.ts          # Zod validation schemas
│
└── types/
    ├── auth.ts                 # Auth type definitions
    └── dashboard.ts            # Dashboard type definitions
```

### Architecture Principles

✅ **Single Source**: All code under `src/` - no confusing duplicate folders
✅ **Clear Separation**: Routes, components, logic, and types clearly separated
✅ **Performance First**: React.memo, useCallback, and useMemo throughout
✅ **Type-Safe**: Strict TypeScript with zero `any` types
✅ **KISS & DRY**: Simple, non-repeated code following best practices

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Login Credentials

The application includes demo accounts for testing:

- **Admin Account:**
  - Email: `admin@example.com`
  - Password: `admin123`

- **User Account:**
  - Email: `user@example.com`
  - Password: `user123`

### Dashboard Features

1. **Search:** Type in the search bar to filter tasks by title, description, or assignee. Search is debounced for better performance.

2. **Filters:** Use the dropdown filters to narrow down results by:
   - Status (active, pending, completed, cancelled)
   - Priority (low, medium, high)
   - Category (various project categories)

3. **Pagination:** Navigate through pages and adjust the number of items per page using the pagination controls.

4. **Dark Mode:** Toggle between light and dark themes using the button in the header. The app respects your system preference by default.

5. **State Persistence:** All filters, search queries, and pagination settings are saved in the URL, so you can bookmark or share specific views.

## Architecture Decisions

### Component Organization

Components are organized by feature and responsibility:
- **Separation of Concerns:** UI components are separate from business logic
- **Reusability:** Common components like filters and pagination are highly reusable
- **Size Management:** Components are kept under 120 lines; larger components are split into smaller ones

### Performance Optimizations

1. **Debounced Search:** Search input is debounced to reduce API calls and improve performance
2. **Memoization:** Expensive computations are memoized using useMemo and useCallback
3. **Skeleton Loading:** Loading states use skeleton screens instead of spinners for better UX
4. **URL State:** State is stored in URL parameters to enable browser back/forward navigation

### Type Safety

- **Strict TypeScript:** No `any` types are used throughout the codebase
- **Zod Validation:** Runtime validation ensures type safety at boundaries
- **Interface Definitions:** Clear interfaces for all data structures

### Accessibility

- **Keyboard Navigation:** All interactive elements are keyboard accessible
- **ARIA Labels:** Screen reader support with proper ARIA attributes
- **Focus Management:** Logical focus flow throughout the application
- **Color Contrast:** WCAG AA compliant color contrast ratios

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## Contributing

### Code Style

- Follow the existing code structure and patterns
- Use TypeScript for all new files
- Ensure components are under 120 lines
- Write meaningful commit messages
- Add comments for complex logic

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- **KISS Principle:** Keep code simple and straightforward
- **DRY Principle:** Don't repeat yourself; create reusable components
- **Component Size:** Keep components under 120 lines
- **Type Safety:** Avoid using `any` types
- **Accessibility:** Ensure all features are accessible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
