"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "../../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const LeaveCollectiveModal = () => {
  const supabase = createClientComponentClient();
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveCollective";
  const { collective } = data;
  const { user } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    console.log("trying to leave");
    try {
      setIsLoading(true);
      if (collective && user && Array.isArray(collective.users)) {
        const updatedUsers = collective.users.filter(
          (user1): user1 is colUser => {
            return (
              user1 != null &&
              typeof user1 === "object" &&
              !Array.isArray(user1) &&
              user.id !== user1.id
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
          .eq("id", user.id)
          .single();
        if (userToGo && Array.isArray(userToGo.collectives)) {
          const updatedCollectives = userToGo?.collectives.filter(
            (collectiveToGo: Json) => {
              return (
                collectiveToGo != null &&
                typeof collectiveToGo === "object" &&
                !Array.isArray(collectiveToGo) &&
                collective.id !== collectiveToGo.id
              );
            }
          );
          console.log(updatedCollectives);
          const { data: data2, error: error2 } = await supabase
            .from("users")
            .update({ collectives: updatedCollectives })
            .eq("id", user.id)
            .select();
          console.log("please update");
          console.log(data2);
          console.log(error2);

          if (!error) {
            collective.users = updatedUsers;
          }
        }
      }
      onClose();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            Leave Collective
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {collective?.unique}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} variant="primary" onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
