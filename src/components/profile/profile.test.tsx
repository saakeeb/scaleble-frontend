import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Profile } from './profile';
import { useAuth } from '@/components/auth/auth-provider';

vi.mock('@/components/auth/auth-provider', () => ({
  useAuth: vi.fn(),
}));

describe('Profile Component', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  };

  it('renders user profile information correctly', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ user: mockUser });
    render(<Profile />);

    // Check for main title
    expect(screen.getByRole('heading', { name: /profile/i })).toBeDefined();

    // Check for user name (might appear multiple times)
    const nameElements = screen.getAllByText(mockUser.name);
    expect(nameElements.length).toBeGreaterThan(0);

    // Check for email (appears in header and details)
    const emailElements = screen.getAllByText(mockUser.email);
    expect(emailElements.length).toBeGreaterThan(0);
  });

  it('displays correct initials in avatar', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ user: mockUser });
    render(<Profile />);
    expect(screen.getByText('JD')).toBeDefined();
  });

  it('displays correct role badge for regular user', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ user: mockUser });
    render(<Profile />);
    expect(screen.getByText('User')).toBeDefined();
  });

  it('displays correct role badge for admin user', () => {
    const adminUser = { ...mockUser, role: 'admin' };
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ user: adminUser });
    render(<Profile />);
    expect(screen.getByText('Administrator')).toBeDefined();
  });

  it('displays account status as active', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ user: mockUser });
    render(<Profile />);
    expect(screen.getByText('Active')).toBeDefined();
  });

  it('renders nothing when user is null', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ user: null });
    const { container } = render(<Profile />);
    expect(container.firstChild).toBeNull();
  });
});