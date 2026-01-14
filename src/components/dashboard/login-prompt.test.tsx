import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginPrompt } from './login-prompt';

describe('LoginPrompt Component', () => {
  it('renders login message and button', () => {
    render(<LoginPrompt />);
    expect(screen.getByText('Login Required')).toBeDefined();
    expect(screen.getByText('Please sign in to view the dashboard data and access all features')).toBeDefined();
    expect(screen.getByRole('link', { name: /login to continue/i })).toBeDefined();
  });

  it('displays demo credentials', () => {
    render(<LoginPrompt />);
    expect(screen.getByText(/admin@example.com/)).toBeDefined();
    expect(screen.getByText(/user@example.com/)).toBeDefined();
  });
});