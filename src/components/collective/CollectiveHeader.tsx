"use client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "../../../hooks/use-modal-store";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface CollectiveHeaderProps {
  collective: Collective;
  colUser?: Json;
  userData: User[];
  user: User;
}

export const CollectiveHeader = ({
  collective,
  colUser,
  userData,
  user,
}: CollectiveHeaderProps) => {
  const supabase = createClientComponentClient();
  const { onOpen } = useModal();
  const isFounder =
    colUser && !Array.isArray(colUser) && typeof colUser === "object"
      ? collective.founder === colUser?.id
      : null;
  const role =
    colUser && !Array.isArray(colUser) && typeof colUser === "object"
      ? colUser?.role
      : null;
  var userRole: Json | undefined = [];
  var router = useRouter();
  if (Array.isArray(collective.roles)) {
    userRole = collective?.roles?.find(
      (colRole) =>
        colRole !== null &&
        typeof colRole === "object" &&
        !Array.isArray(colRole) &&
        colRole.id === role
    );
  }

  useEffect(() => {
    const channel = supabase
      .channel("collectives_nav")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collectives",
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (
            newPayload &&
            typeof newPayload === "object" &&
            newPayload.id === collective.id
          ) {
            router.refresh();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, user.id]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex items-center w-full h-12 px-3 font-semibold transition border-b-2 text-md border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          {collective.unique}
          <ChevronDown className="w-5 h-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {(isFounder || true) && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { collective })}
            className="px-3 py-2 text-sm text-indigo-600 cursor-pointer dark:text-indigo-400"
          >
            Invite People
            <UserPlus className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {(isFounder || true) && (
          <DropdownMenuItem
            onClick={() => onOpen("editCollective", { collective })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Collective Settings
            <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {(isFounder || true) && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { collective, userData })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Manage Members
            <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {(isFounder || true) && (
          <DropdownMenuItem
            onClick={() => onOpen("createSpace", { collective })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Create Space
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {(isFounder || true) && <DropdownMenuSeparator />}
        {(isFounder || true) && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteCollective", { collective })}
            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
          >
            Delete Collective
            <Trash className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isFounder && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveCollective", { collective, user })}
            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
          >
            Leave Collective
            <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
