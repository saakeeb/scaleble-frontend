import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dashboard } from './dashboard';
import { useAuth } from '@/components/auth/auth-provider';
import { useDashboard } from '@/hooks/useDashboard';

// Mock dependencies
vi.mock('@/components/auth/auth-provider', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/hooks/useDashboard', () => ({
  useDashboard: vi.fn(),
}));

// Mock child components to simplify testing the container
vi.mock('./search-bar', () => ({
  SearchBar: ({ value, onChange, disabled }: any) => (
    <input 
      data-testid="search-bar" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  ),
}));

vi.mock('./filters', () => ({
  Filters: () => <div data-testid="filters">Filters</div>,
}));

vi.mock('./data-table', () => ({
  DataTable: ({ data }: any) => <div data-testid="data-table">{data.length} items</div>,
}));

vi.mock('./data-pagination', () => ({
  DataPagination: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock('./table-skeleton', () => ({
  TableSkeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock('./error-display', () => ({
  ErrorDisplay: ({ message, onRetry }: any) => (
    <div data-testid="error">
      {message}
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
}));

vi.mock('./empty-state', () => ({
  EmptyState: () => <div data-testid="empty">No data</div>,
}));

vi.mock('./login-prompt', () => ({
  LoginPrompt: () => <div data-testid="login-prompt">Login Required</div>,
}));

describe('Dashboard Component', () => {
  const mockRefreshData = vi.fn();
  const mockHandleSearchChange = vi.fn();

  const defaultDashboardState = {
    searchQuery: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    data: null,
    isLoading: false,
    error: null,
    categories: ['Bug', 'Feature'],
    handleSearchChange: mockHandleSearchChange,
    handleStatusChange: vi.fn(),
    handlePriorityChange: vi.fn(),
    handleCategoryChange: vi.fn(),
    handlePageChange: vi.fn(),
    handlePageSizeChange: vi.fn(),
    refreshData: mockRefreshData,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login prompt when not authenticated', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isAuthenticated: false });
    (useDashboard as unknown as ReturnType<typeof vi.fn>).mockReturnValue(defaultDashboardState);

    render(<Dashboard />);

    expect(screen.getByTestId('login-prompt')).toBeDefined();
    expect(screen.getByTestId('search-bar')).toBeDefined();
    // Check if search bar is disabled
    expect(screen.getByTestId('search-bar').hasAttribute('disabled')).toBe(true);
  });

  it('renders dashboard content when authenticated', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isAuthenticated: true });
    (useDashboard as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...defaultDashboardState,
      data: { data: [{ id: 1 }], page: 1, totalPages: 1, pageSize: 10, total: 1 },
    });

    render(<Dashboard />);

    expect(screen.queryByTestId('login-prompt')).toBeNull();
    expect(screen.getByTestId('search-bar')).toBeDefined();
    expect(screen.getByTestId('search-bar').hasAttribute('disabled')).toBe(false);
    expect(screen.getByTestId('data-table')).toBeDefined();
    expect(screen.getByTestId('pagination')).toBeDefined();
  });

  it('renders loading skeleton when loading', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isAuthenticated: true });
    (useDashboard as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...defaultDashboardState,
      isLoading: true,
    });

    render(<Dashboard />);

    expect(screen.getByTestId('skeleton')).toBeDefined();
  });

  it('renders error display when error occurs', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isAuthenticated: true });
    (useDashboard as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...defaultDashboardState,
      error: 'Failed to fetch',
    });

    render(<Dashboard />);

    expect(screen.getByTestId('error')).toBeDefined();
    expect(screen.getByText('Failed to fetch')).toBeDefined();
  });

  it('renders empty state when no data', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isAuthenticated: true });
    (useDashboard as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...defaultDashboardState,
      data: { data: [], page: 1, totalPages: 0, pageSize: 10, total: 0 },
    });

    render(<Dashboard />);

    expect(screen.getByTestId('empty')).toBeDefined();
  });
});