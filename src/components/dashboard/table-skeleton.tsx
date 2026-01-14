import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function TableSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[300px]" />
        </div>
      </div>
    </Card>
  );
}
