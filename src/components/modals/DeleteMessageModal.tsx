"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "../../../hooks/use-modal-store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import isObject from "@/lib/isObject";
import ButtonLoader from "../me/ButtonLoader";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const supabase = createClientComponentClient();

  const isModalOpen = isOpen && type === "deleteMessage";
  const { message } = data;
  const [isLoading, setIsLoading] = useState(false);
  if (!isObject(message)) return null;

  const onClick = async () => {
    try {
      setIsLoading(true);
      await supabase
        .from("messages")
        .update({ deleted: true })
        .eq("id", message.id);
      onClose();
    } catch (error) {
      throw new Error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-left">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Are you sure you want to do this? The message will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <ButtonLoader
              disabled={isLoading}
              onClick={onClick}
              isLoading={isLoading}
              text="Confirm"
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
