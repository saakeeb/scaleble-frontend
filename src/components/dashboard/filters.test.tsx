import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Filters } from './filters';

// Mock Select component to simplify testing interactions
vi.mock('@/components/ui/select', () => ({
  Select: ({ value, onValueChange, children }: any) => (
    <div data-testid="select-mock">
      <span data-testid="select-value">{value}</span>
      <button 
        data-testid="select-trigger-mock" 
        onClick={() => onValueChange('test-value')}
      >
        Change
      </button>
      {children}
    </div>
  ),
  SelectTrigger: ({ children, id }: any) => <div id={id}>{children}</div>,
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children }: any) => <div>{children}</div>,
}));

describe('Filters Component', () => {
  const defaultProps = {
    status: 'all',
    priority: 'all',
    category: 'all',
    categories: ['Dev', 'Design'],
    onStatusChange: vi.fn(),
    onPriorityChange: vi.fn(),
    onCategoryChange: vi.fn(),
  };

  it('renders all filter labels', () => {
    render(<Filters {...defaultProps} />);
    expect(screen.getByText('Status')).toBeDefined();
    expect(screen.getByText('Priority')).toBeDefined();
    expect(screen.getByText('Category')).toBeDefined();
  });

  it('calls change handlers when selects are changed', () => {
    render(<Filters {...defaultProps} />);
    
    // Get all mock triggers
    const triggers = screen.getAllByTestId('select-trigger-mock');
    expect(triggers).toHaveLength(3);

    // Simulate clicks (order in component: Status, Priority, Category)
    fireEvent.click(triggers[0]);
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith('test-value');

    fireEvent.click(triggers[1]);
    expect(defaultProps.onPriorityChange).toHaveBeenCalledWith('test-value');

    fireEvent.click(triggers[2]);
    expect(defaultProps.onCategoryChange).toHaveBeenCalledWith('test-value');
  });
});