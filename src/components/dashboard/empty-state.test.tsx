import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './empty-state';

describe('EmptyState Component', () => {
  it('renders with default text', () => {
    render(<EmptyState />);
    expect(screen.getByText('No data found')).toBeDefined();
    expect(screen.getByText('Try adjusting your filters or search query')).toBeDefined();
  });

  it('renders with custom title and description', () => {
    render(
      <EmptyState 
        title="Nothing here" 
        description="Please check back later" 
      />
    );
    expect(screen.getByText('Nothing here')).toBeDefined();
    expect(screen.getByText('Please check back later')).toBeDefined();
  });
});