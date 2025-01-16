import { Skeleton } from "@/components/ui/skeleton";

function TemplatesSkeleton() {
  return (
    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="  flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/3 mt-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TemplatesSkeleton;
