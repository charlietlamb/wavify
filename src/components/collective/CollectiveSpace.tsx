"use client";

import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ModalType, useModal } from "../../../hooks/use-modal-store";
import { ActionTooltip } from "../util/ActionTooltip";

interface CollectiveSpaceProps {
  space: Json;
  collective: Collective;
  user?: User;
}

const iconMap = {
  ["text"]: Hash,
  ["audio"]: Mic,
  ["video"]: Video,
};

export const CollectiveSpace = ({
  space,
  collective,
  user,
}: CollectiveSpaceProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  var role: Json | undefined = undefined;
  if (user && collective && Array.isArray(collective.users)) {
    const colUser: Json | undefined = collective.users.find(
      (user1: Json) =>
        user1 &&
        typeof user1 === "object" &&
        !Array.isArray(user1) &&
        user1.id === user.id
    );
    if (colUser && collective && Array.isArray(collective.roles)) {
      role = collective.roles.find(
        (role1: Json) =>
          role1 &&
          typeof role1 === "object" &&
          !Array.isArray(role1) &&
          colUser &&
          typeof colUser === "object" &&
          !Array.isArray(colUser) &&
          role1.id === colUser.roleId
      );
    }
  }

  if (
    space &&
    !Array.isArray(space) &&
    typeof space === "object" &&
    role &&
    !Array.isArray(role) &&
    typeof role === "object"
  ) {
    const isValidKey = (key: any): key is keyof typeof iconMap => {
      return key in iconMap;
    };

    const Icon =
      iconMap[
        space &&
        !Array.isArray(space) &&
        typeof space === "object" &&
        isValidKey(space.type)
          ? space.type
          : "text"
      ];
    const onClick = () => {
      router.push(`/collective/${params?.unique}/${space.slug}`);
    };

    const onAction = (e: React.MouseEvent, action: ModalType) => {
      e.stopPropagation();
      onOpen(action, { space, collective });
    };

    return (
      <button
        onClick={onClick}
        className={cn(
          "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
          params?.spaceId === space.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
      >
        <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <p
          className={cn(
            "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            params?.spaceId === space.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {<>{space.name}</>}
        </p>
        {space.name !== "general" && role.canCreate && (
          <div className="flex items-center ml-auto gap-x-2">
            <ActionTooltip label="Edit">
              <Edit
                onClick={(e) => onAction(e, "editSpace")}
                className="hidden w-4 h-4 transition group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={(e) => onAction(e, "deleteSpace")}
                className="hidden w-4 h-4 transition group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
          </div>
        )}
      </button>
    );
  } else {
    return <></>;
  }
};
