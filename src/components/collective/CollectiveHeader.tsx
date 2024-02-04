"use client";
import {
  Castle,
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import isObject from "@/lib/isObject";
import { useHeaderChangeEffect } from "./(header)/(hooks)/useHeaderChangeEffect";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CollectiveRoles from "./CollectiveRoles";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
  if (!isObject(colUser) || !Array.isArray(collective.roles))
    return redirect("/");
  const isFounder = collective.founder === colUser?.id;
  var router = useRouter();
  const userRole = collective?.roles?.find(
    (colRole: Json) => isObject(colRole) && colRole.id === colUser.roleId
  );
  if (!isObject(userRole)) return redirect("/");
  useHeaderChangeEffect(supabase, user, collective, router);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex items-center w-full h-12 px-3 font-semibold transition border-b-2 text-md border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          {collective.unique}
          <ChevronDown className="w-5 h-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {(isFounder || userRole.canInvite) && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { collective })}
            className="px-3 py-2 text-sm text-indigo-600 cursor-pointer dark:text-indigo-400"
          >
            Invite People
            <UserPlus className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {(isFounder || userRole.canSettings) && (
          <DropdownMenuItem
            onClick={() => onOpen("editCollective", { collective })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Collective Settings
            <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {(isFounder || userRole.canRoles) && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="justify-between min-w-full px-3 py-2"
              >
                Manage Roles
                <Castle className="w-4 h-4 ml-auto"></Castle>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[50vw] max-w-[50vw]">
              <SheetHeader>
                <SheetTitle>Manage Roles</SheetTitle>
                <SheetDescription>
                  Add, edit or delete roles for this collective.
                </SheetDescription>
              </SheetHeader>
              <CollectiveRoles></CollectiveRoles>
            </SheetContent>
          </Sheet>
        )}
        {(isFounder || userRole.canMembers) && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { collective, userData })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Manage Members
            <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {(isFounder || userRole.canCreate) && (
          <DropdownMenuItem
            onClick={() => onOpen("createSpace", { collective })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Create Space
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {isFounder && (
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
