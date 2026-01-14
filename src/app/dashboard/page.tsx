'use client';

import { useAuth } from '@/components/auth/auth-provider';
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
import { useDashboard } from '@/hooks/useDashboard';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const {
    searchQuery,
    status,
    priority,
    category,
    data,
    isLoading,
    error,
    categories,
    handleSearchChange,
    handleStatusChange,
    handlePriorityChange,
    handleCategoryChange,
    handlePageChange,
    handlePageSizeChange,
    refreshData,
  } = useDashboard({ isAuthenticated });

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
        <ErrorDisplay message={error} onRetry={refreshData} />
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
