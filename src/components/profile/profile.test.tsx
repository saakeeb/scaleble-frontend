import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Profile } from './profile';

describe('Profile Component', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  };

  it('renders user profile information correctly', () => {
    render(<Profile user={mockUser} />);

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
    render(<Profile user={mockUser} />);
    expect(screen.getByText('JD')).toBeDefined();
  });

  it('displays correct role badge for regular user', () => {
    render(<Profile user={mockUser} />);
    expect(screen.getByText('User')).toBeDefined();
  });

  it('displays correct role badge for admin user', () => {
    const adminUser = { ...mockUser, role: 'admin' };
    render(<Profile user={adminUser} />);
    expect(screen.getByText('Administrator')).toBeDefined();
  });

  it('displays account status as active', () => {
    render(<Profile user={mockUser} />);
    expect(screen.getByText('Active')).toBeDefined();
  });
});