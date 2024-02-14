"use client";

import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "../me/UserAvatar";
import isObject from "@/lib/isObject";

interface CollectiveUserProps {
  colUserAndData: ColUserAndData;
  user: User;
}

export const CollectiveMember = ({
  colUserAndData,
  user,
}: CollectiveUserProps) => {
  const params = useParams();
  const router = useRouter();
  if (!isObject(colUserAndData)) return null;

  const onClick = () => {
    if (colUserAndData.users?.id === user.id) return;
    router.push(`/user/${colUserAndData.users?.username}/chat/`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex justify-between w-full items-center hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 px-2 group  py-2 rounded-md transition mb-1",

        params?.userId === colUserAndData.users?.id &&
          "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <div className=" flex items-center gap-x-2 w-full  ">
        <UserAvatar
          src="https://github.com/shadcn.png"
          className="w-8 h-8 md:h-8 md:w-8"
        />
        <p
          className={cn(
            "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            params?.userId === colUserAndData.users?.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
          style={{ color: colUserAndData.roles?.color }}
        >
          {<>{colUserAndData.users?.username}</>}
        </p>
      </div>
      {colUserAndData.roles?.emoji}
    </button>
  );
};
