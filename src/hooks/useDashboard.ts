import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchDashboardData, getCategories } from '@/lib/mock-api';
import { DashboardItem, PaginatedResponse } from '@/types/dashboard';

interface UseDashboardProps {
  isAuthenticated: boolean;
}

export function useDashboard({ isAuthenticated }: UseDashboardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || 'all');
  const [priority, setPriority] = useState(searchParams.get('priority') || 'all');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10);

  const [data, setData] = useState<PaginatedResponse<DashboardItem> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const categories = useMemo(() => getCategories(), []);

  // URL Sync Effect
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (status !== 'all') params.set('status', status);
    if (priority !== 'all') params.set('priority', priority);
    if (category !== 'all') params.set('category', category);
    if (page > 1) params.set('page', String(page));
    if (pageSize !== 10) params.set('pageSize', String(pageSize));

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, status, priority, category, page, pageSize, router]);

  // Data Fetching Logic
  const loadData = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchDashboardData({
        search: debouncedSearch,
        status: status === 'all' ? undefined : status,
        priority: priority === 'all' ? undefined : priority,
        category: category === 'all' ? undefined : category,
        page,
        pageSize,
      });

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, debouncedSearch, status, priority, category, page, pageSize]);

  // Data Fetch Effect
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
    setPage(1);
  }, []);

  const handlePriorityChange = useCallback((value: string) => {
    setPriority(value);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  return {
    searchQuery, status, priority, category, page, pageSize,
    data, isLoading, error, categories,
    handleSearchChange, handleStatusChange, handlePriorityChange,
    handleCategoryChange, handlePageChange, handlePageSizeChange,
    refreshData: loadData,
  };
}