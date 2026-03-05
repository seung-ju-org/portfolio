import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="mb-5 rounded-xl border bg-card/80 p-5">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="mt-3 h-4 w-1/2" />
      <div className="mt-5 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

type ProjectsSkeletonProps = {
  count?: number;
};

export function PortfolioSkeleton({ count = 6 }: ProjectsSkeletonProps) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={`project-skeleton-${index}`} />
      ))}
    </div>
  );
}
