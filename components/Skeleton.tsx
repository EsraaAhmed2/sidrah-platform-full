import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]/50",
        className
      )}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="card">
      <Skeleton className="w-full h-40 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
