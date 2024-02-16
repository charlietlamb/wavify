"use client";

import { Edit, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModalType, useModal } from "../../../hooks/use-modal-store";
import { ActionTooltip } from "../util/ActionTooltip";
import { iconMap, iconMapSidebar } from "./space/data";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRoleUpdateEffect } from "../modals/hooks/useRoleUpdateEffect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface CollectiveSpaceProps {
  spaces: Space[];
  space: Space;
  collective: Collective;
  userRole: Role;
  roles: Role[];
}

export const CollectiveSpace = ({
  spaces,
  space,
  collective,
  userRole,
  roles,
}: CollectiveSpaceProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const onClick = () => {
    router.push(`/collective/${params?.unique}/${space.slug}`);
  };
  const [rolesAndAllowed, setRolesAndAllowed] = useState<RoleAndAllowed[]>(
    roles.map((role) => ({ ...role, allowed: space.allowed.includes(role.id) }))
  );

  const rolesAndAllowedRef = useRef(rolesAndAllowed);
  useEffect(() => {
    rolesAndAllowedRef.current = rolesAndAllowed;
  }, [rolesAndAllowed]);

  const onAction = useCallback(
    (e: React.MouseEvent, action: ModalType) => {
      e.stopPropagation();
      onOpen(action, {
        space,
        collective,
        spaces,
        rolesAndAllowed: rolesAndAllowedRef.current,
      });
    },
    [onOpen, space, collective, spaces]
  );
  useRoleUpdateEffect(
    supabase,
    collective,
    rolesAndAllowed,
    setRolesAndAllowed
  );
  /* so error is that I can't pass the updated roles into the edit space modal and then the create space modal meaning that the roles being eidted are outdated */
  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.spaceId === space.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {iconMapSidebar[space?.type as keyof typeof iconMap]}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition text-left",
          params?.spaceId === space.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {<>{space.name}</>}
      </p>
      {space.name !== "general" && userRole.canCreate && (
        <div className="flex items-center ml-auto gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => {
                onAction(e, "editSpace");
              }}
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
};
