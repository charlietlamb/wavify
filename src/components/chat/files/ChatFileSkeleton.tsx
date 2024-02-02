import { Skeleton } from "../../ui/skeleton";

export default function ChatFileSkeleton() {
  return (
    <div className="flex items-center justify-start w-full py-4 gap-x-2">
      <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
      <Skeleton className="flex-grow h-12 rounded-md"></Skeleton>
    </div>
  );
}
