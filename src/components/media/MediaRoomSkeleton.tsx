import { Skeleton } from "../ui/skeleton";

export default function MediaRoomSkeleton() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-[2.5%] px-[2%] rounded-xl">
      <Skeleton className="w-full h-[85%] rounded-lg" />
      <div className="flex justify-center gap-x-[1%] w-full h-[15%] pt-[2%] px-[12%]">
        <Skeleton className="w-[15%] rounded-md" />
        <Skeleton className="w-[15%] rounded-md" />
        <Skeleton className="w-[15%] rounded-md" />
        <Skeleton className="w-[15%] rounded-md" />
        <Skeleton className="w-[15%] rounded-md" />
      </div>
    </div>
  );
}
