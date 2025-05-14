import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-screen">
      {/* 10 skeletons */}
      {Array.from({ length: 10 }, (_, index: number) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[280px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
