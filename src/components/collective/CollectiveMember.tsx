"use client";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "../me/UserAvatar";

interface CollectiveUserProps {
  user: Json;
  collective: Collective;
}

interface RoleIconMap {
  [key: string]: JSX.Element;
}

const roleIconMap: RoleIconMap = {
  other: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
  founder: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};

export const CollectiveMember = ({ user, collective }: CollectiveUserProps) => {
  var colUser: Json | undefined = undefined;
  if (user && collective && Array.isArray(collective.users)) {
    colUser = collective.users.find(
      (user1: Json) =>
        user1 &&
        typeof user1 === "object" &&
        !Array.isArray(user1) &&
        user &&
        typeof user === "object" &&
        !Array.isArray(user) &&
        user1.id === user.id
    );
  }
  const params = useParams();
  const router = useRouter();

  const icon =
    roleIconMap[
      colUser &&
      !Array.isArray(colUser) &&
      typeof colUser === "object" &&
      typeof colUser.role === "string"
        ? colUser.role
        : ""
    ];

  const onClick = () => {
    router.push(
      `/collective/${params?.unique}/chat/${
        user && !Array.isArray(user) && typeof user === "object"
          ? user.username
          : ""
      }`
    );
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        user &&
          typeof user === "object" &&
          !Array.isArray(user) &&
          params?.userId === user.id &&
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
          user &&
            typeof user === "object" &&
            !Array.isArray(user) &&
            params?.userId === user.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {
          <>
            {user && typeof user === "object" && !Array.isArray(user)
              ? user.username
              : ""}
          </>
        }
      </p>
      {icon}
    </button>
  );
};
