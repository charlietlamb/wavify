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
import isObject from "@/lib/isObject";
import ButtonLoader from "../me/ButtonLoader";
import { colUserLeave } from "./functions/colUserLeave";

export const LeaveCollectiveModal = () => {
  const supabase = createClientComponentClient();
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveCollective";
  const { collective } = data;
  const { user } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (collective && user) {
        colUserLeave(supabase, user, collective);
      }
      onClose();
      router.push("/");
    } catch (error) {
      throw new Error(
        isObject(error) && typeof error.message === "string"
          ? error.message
          : "error in leave collective modal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-left">
            Leave Collective
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-primary">
              {collective?.unique}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 ">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <ButtonLoader
              isLoading={isLoading}
              onClick={onClick}
              text="Confirm"
            ></ButtonLoader>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
