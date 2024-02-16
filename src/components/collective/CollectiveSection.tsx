"use client";

import { Plus, Settings } from "lucide-react";
import { ActionTooltip } from "../util/ActionTooltip";
import { useModal } from "../../../hooks/use-modal-store";

interface CollectiveSectionProps {
  label: string;
  user: User;
  sectionType: "spaces" | "users";
  spaceType?: SpaceType;
  collective?: Collective;
  colUser: ColUserAndData | null;
  colUsers: ColUserAndData[];
  roles: Role[];
}

export default function CollectiveSection({
  label,
  user,
  sectionType,
  spaceType,
  collective,
  colUser,
  colUsers,
  roles,
}: CollectiveSectionProps) {
  const { onOpen } = useModal();
  const canCreate = colUser?.roles?.canCreate || false;
  const canMembers = colUser?.roles?.canMembers || false;
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {canCreate && sectionType === "spaces" && (
        <ActionTooltip label="Create Space" side="top">
          <button
            onClick={() =>
              onOpen("createSpace", { collective, spaceType, roles })
            }
            className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
      {canMembers && sectionType === "users" && (
        <ActionTooltip label="Manage Users" side="top">
          <button
            onClick={() =>
              onOpen("members", { user, collective, colUsers, roles })
            }
            className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Settings className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
}
