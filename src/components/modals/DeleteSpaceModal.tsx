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
import { Button } from "@/components/ui/button";
import { useModal } from "../../../hooks/use-modal-store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const DeleteSpaceModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const isModalOpen = isOpen && type === "deleteSpace";
  const { collective, space } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (
        space &&
        typeof space === "object" &&
        !Array.isArray(space) &&
        space.id
      ) {
        if (collective && Array.isArray(collective.spaces)) {
          const spacesToUpdate = collective.spaces.filter(
            (item: Json) =>
              item &&
              !Array.isArray(item) &&
              typeof item === "object" &&
              item.id !== space.id
          );
          await supabase
            .from("collectives")
            .update({ spaces: spacesToUpdate })
            .eq("id", collective.id);
        }
      }

      onClose();
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
            Delete Space
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {collective?.unique}
            </span>{" "}
            will be permanently deleted.
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
