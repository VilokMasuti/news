import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-8 mt-10 md:mt-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-lg border shadow-sm"
          >
            <Skeleton className="aspect-video w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
