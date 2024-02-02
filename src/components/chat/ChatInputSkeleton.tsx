import { Skeleton } from "../ui/skeleton";

export default function ChatInputSkeleton() {
  return (
    <div className="flex items-center justify-start w-full py-4 gap-x-2">
      <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
      <div className="flex-col justify-between flex-grow h-full space-y-1">
        {/*<div className="flex justify-start gap-x-1">
          <Skeleton className="w-20 h-4 rounded-sm"></Skeleton>
          <Skeleton className="w-20 h-4 rounded-sm"></Skeleton>
  </div>*/}
        <Skeleton className="w-full h-4 rounded-sm"></Skeleton>
        <Skeleton className="w-full h-4 rounded-sm"></Skeleton>
      </div>
    </div>
  );
}
