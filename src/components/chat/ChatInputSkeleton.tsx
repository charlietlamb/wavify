import { Skeleton } from "../ui/skeleton";

export default function ChatInputSkeleton() {
  return (
    <div className="flex items-center justify-start w-full py-4 gap-x-2">
      <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
      <div className="flex-col justify-between flex-grow h-12 space-y-2">
        <Skeleton className="w-full h-5 rounded-md"></Skeleton>
        <Skeleton className="w-[80%] h-5 rounded-md "></Skeleton>
      </div>
    </div>
  );
}
