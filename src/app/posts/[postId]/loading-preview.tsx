import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPreview() {
  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <Skeleton className="h-10 w-44 rounded-xl mb-2" />
          <Skeleton className="h-2" />
        </div>
        <Skeleton className="h-10 rounded-full" />
      </div>
      <div className="py-5">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
