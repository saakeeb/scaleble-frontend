export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignee: string;
}

export interface DashboardFilters {
  search: string;
  status: string;
  priority: string;
  category: string;
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type SortField = keyof DashboardItem;
export type SortOrder = 'asc' | 'desc';
