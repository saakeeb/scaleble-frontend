// src/components/header/header.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './header';
import { useAuth } from '@/components/auth/auth-provider';
import { useRouter } from 'next/navigation';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/components/auth/auth-provider', () => ({
  useAuth: vi.fn(),
}));

// Mock ThemeToggle to isolate Header logic
vi.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

// Mock DropdownMenu components to avoid Radix UI pointer event issues in JSDOM
vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <div onClick={onClick}>
      {children}
    </div>
  ),
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuSeparator: () => <hr />,
}));

describe('Header Component', () => {
  const mockRouter = {
    push: vi.fn(),
  };
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockRouter);
  });

  it('renders dashboard title and theme toggle', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: mockLogout,
    });

    render(<Header />);

    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByTestId('theme-toggle')).toBeDefined();
  });

  it('navigates to login page on login button click', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: mockLogout,
    });

    render(<Header />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('renders user avatar when authenticated', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: true,
      user: user,
      logout: mockLogout,
    });

    render(<Header />);

    // Avatar fallback shows initials "JD"
    expect(screen.getByText('JD')).toBeDefined();
    expect(screen.queryByRole('button', { name: /login/i })).toBeNull();
  });

  it('navigates to profile on profile menu item click', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: true,
      user: user,
      logout: mockLogout,
    });

    render(<Header />);

    // Open dropdown
    fireEvent.click(screen.getByText('JD'));

    // Click Profile
    fireEvent.click(screen.getByText('Profile'));

    expect(mockRouter.push).toHaveBeenCalledWith('/profile');
  });

  it('calls logout and navigates to login on logout menu item click', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: true,
      user: user,
      logout: mockLogout,
    });

    render(<Header />);

    // Open dropdown
    fireEvent.click(screen.getByText('JD'));

    // Click Logout
    fireEvent.click(screen.getByText('Logout'));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
});
