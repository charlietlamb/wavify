"use client";

import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "../me/UserAvatar";
import isObject from "@/lib/isObject";

interface CollectiveUserProps {
  colUserAndData: ColUserAndData;
}

export const CollectiveMember = ({ colUserAndData }: CollectiveUserProps) => {
  const params = useParams();
  const router = useRouter();
  /* trying to render colUserAndData however I think that it is returning an empty array after I changed lots in the supabase postgres */
  console.log("rendering member?");
  console.log(colUserAndData);
  if (!isObject(colUserAndData)) return null;

  const onClick = () => {
    router.push(
      `/collective/${params?.unique}/chat/${colUserAndData.users.username}`
    );
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",

        params?.userId === colUserAndData.users.id &&
          "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        src="https://github.com/shadcn.png"
        className="w-8 h-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",

          params?.userId === colUserAndData.users.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {<>{colUserAndData.users.username}</>}
      </p>
      {colUserAndData.roles.emoji}
    </button>
  );
};
