"use client";

import { Plus, Settings } from "lucide-react";
import { ActionTooltip } from "../util/ActionTooltip";
import { useModal } from "../../../hooks/use-modal-store";

interface CollectiveSectionProps {
  label: string;
  user?: User;
  sectionType: "spaces" | "users";
  spaceType?: SpaceType;
  collective?: Collective;
}

export default function CollectiveSection({
  label,
  user,
  sectionType,
  spaceType,
  collective,
}: CollectiveSectionProps) {
  const { onOpen } = useModal();
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
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role &&
        typeof role === "object" &&
        !Array.isArray(role) &&
        role.canCreate &&
        sectionType === "spaces" && (
          <ActionTooltip label="Create Space" side="top">
            <button
              onClick={() => onOpen("createSpace", { collective, spaceType })}
              className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </ActionTooltip>
        )}
      {role &&
        typeof role === "object" &&
        !Array.isArray(role) &&
        role.canMembers &&
        sectionType === "users" && (
          <ActionTooltip label="Manage Users" side="top">
            <button
              onClick={() => onOpen("members", { collective })}
              className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              <Settings className="w-4 h-4" />
            </button>
          </ActionTooltip>
        )}
    </div>
  );
}
