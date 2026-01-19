export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export function FlightCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col md:flex-row gap-6 items-center shadow-sm">
      {/* Airline */}
      <div className="flex items-center gap-4 w-full md:w-[25%]">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full md:w-[45%] flex items-center justify-between px-2">
        <div className="space-y-1">
          <Skeleton className="w-16 h-8" />
          <Skeleton className="w-8 h-3" />
        </div>
        <div className="flex-1 px-4 flex flex-col items-center gap-2">
          <Skeleton className="w-10 h-3" />
          <Skeleton className="w-full h-[2px]" />
          <Skeleton className="w-12 h-3" />
        </div>
        <div className="space-y-1 text-right">
          <Skeleton className="w-16 h-8" />
          <Skeleton className="w-8 h-3 ml-auto" />
        </div>
      </div>

      {/* Price */}
      <div className="w-full md:w-[30%] flex flex-col items-end gap-3 pl-4 md:border-l border-slate-50">
        <Skeleton className="w-16 h-3" />
        <Skeleton className="w-32 h-8" />
        <Skeleton className="w-full h-10 rounded-xl" />
      </div>
    </div>
  );
}
