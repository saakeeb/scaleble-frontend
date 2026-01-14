import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TableSkeleton } from './table-skeleton';

describe('TableSkeleton Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<TableSkeleton />);
    expect(container).toBeDefined();
  });
});