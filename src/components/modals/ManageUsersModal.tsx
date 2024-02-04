"use client";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "../../../hooks/use-modal-store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AvatarDemo } from "../me/Avatar";

interface RoleIconMap {
  [key: string]: JSX.Element;
}

const roleIconMap: RoleIconMap = {
  other: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
  founder: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};

export const MembersModal = ({ user }: { user: User }) => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");
  const supabase = createClientComponentClient<Database>();

  const isModalOpen = isOpen && type === "members";
  const { collective } = data as {
    collective: Collective;
  };
  const { userData } = data as {
    userData: User[];
  };
  const onKick = async (userId: string) => {
    setLoadingId(userId);
    try {
      if (Array.isArray(collective.users)) {
        const updatedUsers = collective.users.filter(
          (user): user is colUser => {
            return (
              user != null &&
              typeof user === "object" &&
              !Array.isArray(user) &&
              user.id !== userId
            );
          }
        );
        const { data, error } = await supabase
          .from("collectives")
          .update({ users: updatedUsers })
          .eq("id", collective.id);
        const { data: userToGo } = await supabase
          .from("users")
          .select()
          .eq("id", userId)
          .single();
        if (userToGo && Array.isArray(userToGo.collectives)) {
          const updatedCollectives = userToGo?.collectives.filter(
            (collectiveToGo): collectiveToGo is Json => {
              return (
                collectiveToGo != null &&
                typeof collectiveToGo === "object" &&
                !Array.isArray(collectiveToGo) &&
                collective.id !== collectiveToGo.id
              );
            }
          );
          const { data: data2, error: error2 } = await supabase
            .from("users")
            .update({ collectives: updatedCollectives })
            .eq("id", userId);
          if (error2) {
            throw new Error(String(error2.message));
          }
          if (!error) {
            collective.users = updatedUsers;
            router.refresh();
            onOpen("members", { collective, userData });
          }
        }
      }
    } catch (error) {
      throw new Error(String(error));
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (userId: string, role: string, roleId: string) => {
    setLoadingId(userId);
    try {
      if (Array.isArray(collective.users)) {
        const updatedUsers = collective.users.map((user) => {
          // Check if the current user is the one to update
          if (
            user != null &&
            typeof user === "object" &&
            !Array.isArray(user) &&
            user.id === userId
          ) {
            // Return a new object with the updated role
            return { ...user, role, roleId };
          }

          // For other users, return the original object
          return user;
        });
        const { data, error } = await supabase
          .from("collectives")
          .update({ users: updatedUsers })
          .eq("id", collective.id);
        if (!error) {
          collective.users = updatedUsers;
          router.refresh();
          onOpen("members", { collective, userData });
        }
      }
    } catch (error) {
      throw new Error(String(error));
    } finally {
      setLoadingId("");
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {Array.isArray(collective?.users) ? collective?.users?.length : "0"}{" "}
            Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {Array.isArray(collective?.users) &&
            collective?.users?.map((colUser: Json) => {
              if (
                colUser &&
                typeof colUser === "object" &&
                !Array.isArray(colUser) &&
                Array.isArray(userData) &&
                colUser.id !== user.id
              ) {
                // Find the matching user in userData
                const userDataMatch = userData.find(
                  (userDataItem) => userDataItem.id === colUser.id
                );
                if (userDataMatch) {
                  return (
                    <div
                      key={typeof colUser.id === "string" ? colUser.id : ""}
                      className="flex items-center mb-6 gap-x-2"
                    >
                      <AvatarDemo src="https://github.com/shadcn.png" />
                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-center text-xs font-semibold gap-x-1">
                          {typeof colUser.username === "string"
                            ? colUser.username
                            : "username not found"}
                        </div>
                        <p className="text-xs text-primary_dark">
                          {typeof userDataMatch.score === "number"
                            ? userDataMatch.score
                            : "score not found"}
                        </p>
                      </div>
                      {/*role picker so need to update when I add my own roles*/}
                      {collective.founder !== colUser.id &&
                        loadingId !== colUser.id &&
                        typeof colUser !== "undefined" && (
                          <div className="ml-auto">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <MoreVertical className="w-4 h-4 text-zinc-500" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="left">
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger className="flex items-center">
                                    <ShieldQuestion className="w-4 h-4 mr-2" />
                                    <span>Role</span>
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                      {Array.isArray(collective?.roles) &&
                                        collective?.roles.map((role) => {
                                          if (
                                            role &&
                                            typeof role === "object" &&
                                            !Array.isArray(role)
                                          ) {
                                            return (
                                              <DropdownMenuItem
                                                key={
                                                  typeof role.id === "string"
                                                    ? role.id
                                                    : ""
                                                }
                                                onClick={() =>
                                                  onRoleChange(
                                                    colUser.id &&
                                                      typeof colUser.id ===
                                                        "string"
                                                      ? colUser.id
                                                      : "",
                                                    role.name &&
                                                      typeof role.name ===
                                                        "string"
                                                      ? role.name
                                                      : "",
                                                    role.id &&
                                                      typeof role.id ===
                                                        "string"
                                                      ? role.id
                                                      : ""
                                                  )
                                                }
                                              >
                                                {
                                                  roleIconMap[
                                                    typeof role.icon ===
                                                    "string"
                                                      ? role.icon
                                                      : ""
                                                  ]
                                                }
                                                {typeof role.name === "string"
                                                  ? role.name
                                                  : ""}
                                                {user.role === role.name && (
                                                  <Check className="w-4 h-4 ml-auto" />
                                                )}
                                              </DropdownMenuItem>
                                            );
                                          }
                                        })}
                                    </DropdownMenuSubContent>
                                  </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    onKick(
                                      colUser.id &&
                                        typeof colUser.id === "string"
                                        ? colUser.id
                                        : ""
                                    )
                                  }
                                >
                                  <Gavel className="w-4 h-4 mr-2" />
                                  Kick
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      {loadingId === colUser.id && (
                        <Loader2 className="w-4 h-4 ml-auto animate-spin text-zinc-500" />
                      )}
                    </div>
                  );
                }
              }
              return null;
            })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
