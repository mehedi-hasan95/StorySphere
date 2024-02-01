import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-3">
      <div className="flex justify-between items-center mb-5">
        <div>
          <Skeleton className="h-10 w-44 rounded-xl mb-2" />
          <Skeleton className="h-2" />
        </div>
        <Skeleton className="h-10 rounded-full" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-96 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-96 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-96 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
          </div>
        </div>
      </div>
    </div>
  );
};
