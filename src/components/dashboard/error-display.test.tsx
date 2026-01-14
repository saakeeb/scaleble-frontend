import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorDisplay } from './error-display';

describe('ErrorDisplay Component', () => {
  it('renders error message', () => {
    render(<ErrorDisplay message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeDefined();
    expect(screen.getByText('Error')).toBeDefined(); // Default title
  });

  it('renders custom title', () => {
    render(<ErrorDisplay title="Custom Title" message="Error" />);
    expect(screen.getByText('Custom Title')).toBeDefined();
  });

  it('renders retry button and handles click when onRetry is provided', () => {
    const handleRetry = vi.fn();
    render(<ErrorDisplay message="Error" onRetry={handleRetry} />);
    
    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeDefined();
    
    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalled();
  });

  it('does not render retry button when onRetry is missing', () => {
    render(<ErrorDisplay message="Error" />);
    expect(screen.queryByRole('button', { name: /retry/i })).toBeNull();
  });
});