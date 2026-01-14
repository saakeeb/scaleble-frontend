'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { fetchDashboardData, getCategories } from '@/lib/mock-api';
import { DashboardItem, PaginatedResponse } from '@/types/dashboard';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchBar } from '@/components/dashboard/search-bar';
import { Filters } from '@/components/dashboard/filters';
import { DataTable } from '@/components/dashboard/data-table';
import { DataPagination } from '@/components/dashboard/data-pagination';
import { TableSkeleton } from '@/components/dashboard/table-skeleton';
import { ErrorDisplay } from '@/components/dashboard/error-display';
import { EmptyState } from '@/components/dashboard/empty-state';
import { LoginPrompt } from '@/components/dashboard/login-prompt';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const updateURL = useCallback(
    (params: Record<string, string | number>) => {
      const newParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== '') {
          newParams.set(key, String(value));
        }
      });

      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [router]
  );

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

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    updateURL({
      search: searchQuery,
      status,
      priority,
      category,
      page,
      pageSize,
    });
  }, [searchQuery, status, priority, category, page, pageSize, updateURL]);

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

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Dashboard</CardTitle>
            <CardDescription>
              Manage and monitor all your tasks in one place
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title, description, or assignee..."
              disabled
            />

            <Separator />

            <Filters
              status={status}
              priority={priority}
              category={category}
              categories={categories}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              onCategoryChange={handleCategoryChange}
            />
          </CardContent>
        </Card>

        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Task Dashboard</CardTitle>
          <CardDescription>
            Manage and monitor all your tasks in one place
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, description, or assignee..."
          />

          <Separator />

          <Filters
            status={status}
            priority={priority}
            category={category}
            categories={categories}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onCategoryChange={handleCategoryChange}
          />
        </CardContent>
      </Card>

      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <ErrorDisplay message={error} onRetry={loadData} />
      ) : data && data.data.length === 0 ? (
        <EmptyState />
      ) : data ? (
        <Card className="p-6">
          <DataTable data={data.data} />
          <DataPagination
            currentPage={data.page}
            totalPages={data.totalPages}
            pageSize={data.pageSize}
            totalItems={data.total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Card>
      ) : null}
    </div>
  );
}
