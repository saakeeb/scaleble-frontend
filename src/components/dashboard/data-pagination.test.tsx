import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataPagination } from './data-pagination';

// Mock Select component since Radix UI can be complex in tests without setup
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange }: any) => (
    <div data-testid="select-mock">
      <button onClick={() => onValueChange('20')} data-testid="select-trigger">
        Change Size
      </button>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: () => <div>10</div>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children }: any) => <div>{children}</div>,
}));

describe('DataPagination Component', () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    pageSize: 10,
    totalItems: 45,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn(),
  };

  it('renders correct pagination info', () => {
    render(<DataPagination {...defaultProps} />);
    // page 2, size 10 -> items 11 to 20
    expect(screen.getByText(/Showing 11 to 20 of 45 results/)).toBeDefined();
    expect(screen.getByText('2')).toBeDefined(); // current page
    expect(screen.getByText('5', { selector: 'span' })).toBeDefined(); // total pages
  });

  it('calls onPageChange with correct value when navigation buttons are clicked', () => {
    render(<DataPagination {...defaultProps} />);
    
    const prevBtn = screen.getByLabelText('Previous page');
    fireEvent.click(prevBtn);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);

    const nextBtn = screen.getByLabelText('Next page');
    fireEvent.click(nextBtn);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    render(<DataPagination {...defaultProps} currentPage={1} />);
    const prevBtn = screen.getByLabelText('Previous page') as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('disables next button on last page', () => {
    render(<DataPagination {...defaultProps} currentPage={5} />);
    const nextBtn = screen.getByLabelText('Next page') as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  });

  it('calls onPageSizeChange when select value changes', () => {
    render(<DataPagination {...defaultProps} />);
    const trigger = screen.getByTestId('select-trigger');
    fireEvent.click(trigger);
    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(20);
  });
});