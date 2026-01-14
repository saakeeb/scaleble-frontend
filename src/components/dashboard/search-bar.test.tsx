import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './search-bar';

describe('SearchBar Component', () => {
  it('renders with correct placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toBeDefined();
  });

  it('displays the current value', () => {
    render(<SearchBar value="test query" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(input.value).toBe('test query');
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('shows clear button only when value is present and not disabled', () => {
    const { rerender } = render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.queryByLabelText('Clear search')).toBeNull();

    rerender(<SearchBar value="test" onChange={() => {}} />);
    expect(screen.getByLabelText('Clear search')).toBeDefined();

    rerender(<SearchBar value="test" onChange={() => {}} disabled />);
    expect(screen.queryByLabelText('Clear search')).toBeNull();
  });

  it('clears input when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="test" onChange={handleChange} />);
    
    const clearBtn = screen.getByLabelText('Clear search');
    fireEvent.click(clearBtn);
    
    expect(handleChange).toHaveBeenCalledWith('');
  });
});