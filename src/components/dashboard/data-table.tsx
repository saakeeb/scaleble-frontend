'use client';

import { memo } from 'react';
import { DashboardItem } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface DataTableProps {
  data: DashboardItem[];
}

interface DataRowProps {
  item: DashboardItem;
}

const statusColors = {
  active: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20',
  pending: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20',
  completed: 'bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20',
  cancelled: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 hover:bg-gray-500/20',
};

const priorityColors = {
  low: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 hover:bg-slate-500/20',
  medium: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-500/20',
  high: 'bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20',
};

const DataRow = memo(({ item }: DataRowProps) => (
  <Card className="p-4 hover:shadow-md transition-shadow">
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 truncate">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Badge className={statusColors[item.status]}>
            {item.status}
          </Badge>
          <Badge className={priorityColors[item.priority]}>
            {item.priority}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="font-medium">Category:</span>
          <span>{item.category}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Assignee:</span>
          <span>{item.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Updated:</span>
          <span>
            {formatDistanceToNow(new Date(item.updatedAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  </Card>
));

DataRow.displayName = 'DataRow';

export const DataTable = memo(({ data }: DataTableProps) => (
  <div className="space-y-3">
    {data.map((item) => (
      <DataRow key={item.id} item={item} />
    ))}
  </div>
));

DataTable.displayName = 'DataTable';
