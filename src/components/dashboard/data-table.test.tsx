import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './data-table';
import { DashboardItem } from '@/types/dashboard';

describe('DataTable Component', () => {
  const mockData: DashboardItem[] = [
    {
      id: '1',
      title: 'Fix Login Bug',
      description: 'Users cannot login via email',
      status: 'active',
      priority: 'high',
      category: 'Bug',
      assignee: 'John Doe',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Update Documentation',
      description: 'Add new API endpoints',
      status: 'completed',
      priority: 'low',
      category: 'Docs',
      assignee: 'Jane Smith',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  it('renders list of items correctly', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByText('Fix Login Bug')).toBeDefined();
    expect(screen.getByText('Users cannot login via email')).toBeDefined();
    expect(screen.getByText('John Doe')).toBeDefined();
    
    expect(screen.getByText('Update Documentation')).toBeDefined();
    expect(screen.getByText('Jane Smith')).toBeDefined();
  });

  it('renders status and priority badges', () => {
    render(<DataTable data={mockData} />);
    expect(screen.getByText('active')).toBeDefined();
    expect(screen.getByText('high')).toBeDefined();
  });
});