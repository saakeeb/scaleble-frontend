import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Home } from './home';
import { useRouter } from 'next/navigation';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
}));

describe('Home Component', () => {
  const mockRouter = {
    replace: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockRouter);
  });

  it('renders loading skeletons', () => {
    render(<Home />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(8);
  });

  it('redirects to dashboard immediately', () => {
    render(<Home />);
    expect(mockRouter.replace).toHaveBeenCalledWith('/dashboard');
  });
});