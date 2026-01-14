import { DashboardItem, DashboardFilters, PaginatedResponse } from '@/types/dashboard';

const MOCK_DATA: DashboardItem[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication system with refresh tokens',
    status: 'completed',
    priority: 'high',
    category: 'Authentication',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    assignee: 'John Doe',
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create responsive landing page with modern UI components',
    status: 'active',
    priority: 'high',
    category: 'Design',
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-22T11:00:00Z',
    assignee: 'Jane Smith',
  },
  {
    id: '3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment pipeline',
    status: 'pending',
    priority: 'medium',
    category: 'DevOps',
    createdAt: '2024-01-17T14:00:00Z',
    updatedAt: '2024-01-17T14:00:00Z',
    assignee: 'Mike Johnson',
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all API endpoints with examples and schemas',
    status: 'active',
    priority: 'medium',
    category: 'Documentation',
    createdAt: '2024-01-18T08:30:00Z',
    updatedAt: '2024-01-21T16:45:00Z',
    assignee: 'Sarah Williams',
  },
  {
    id: '5',
    title: 'Optimize database queries',
    description: 'Improve query performance and add proper indexes',
    status: 'pending',
    priority: 'high',
    category: 'Backend',
    createdAt: '2024-01-19T11:00:00Z',
    updatedAt: '2024-01-19T11:00:00Z',
    assignee: 'David Brown',
  },
  {
    id: '6',
    title: 'Mobile app development',
    description: 'Develop React Native mobile application',
    status: 'cancelled',
    priority: 'low',
    category: 'Mobile',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-14T12:00:00Z',
    assignee: 'Emma Davis',
  },
  {
    id: '7',
    title: 'Security audit',
    description: 'Conduct comprehensive security audit of the application',
    status: 'completed',
    priority: 'high',
    category: 'Security',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-18T17:00:00Z',
    assignee: 'Alex Martinez',
  },
  {
    id: '8',
    title: 'User feedback system',
    description: 'Implement in-app feedback collection mechanism',
    status: 'active',
    priority: 'low',
    category: 'Feature',
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-01-23T10:30:00Z',
    assignee: 'Chris Taylor',
  },
  {
    id: '9',
    title: 'Performance monitoring',
    description: 'Setup application performance monitoring tools',
    status: 'pending',
    priority: 'medium',
    category: 'DevOps',
    createdAt: '2024-01-21T15:00:00Z',
    updatedAt: '2024-01-21T15:00:00Z',
    assignee: 'Lisa Anderson',
  },
  {
    id: '10',
    title: 'Email notification service',
    description: 'Integrate email service for user notifications',
    status: 'active',
    priority: 'medium',
    category: 'Backend',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-23T14:20:00Z',
    assignee: 'Robert Wilson',
  },
];

export async function fetchDashboardData(
  filters: Partial<DashboardFilters>
): Promise<PaginatedResponse<DashboardItem>> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredData = [...MOCK_DATA];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.assignee.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status && filters.status !== 'all') {
    filteredData = filteredData.filter((item) => item.status === filters.status);
  }

  if (filters.priority && filters.priority !== 'all') {
    filteredData = filteredData.filter((item) => item.priority === filters.priority);
  }

  if (filters.category && filters.category !== 'all') {
    filteredData = filteredData.filter((item) => item.category === filters.category);
  }

  const page = filters.page || 1;
  const pageSize = filters.pageSize || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = filteredData.slice(startIndex, endIndex);
  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: paginatedData,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export function getCategories(): string[] {
  const categories = Array.from(new Set(MOCK_DATA.map((item) => item.category)));
  return categories.sort();
}
