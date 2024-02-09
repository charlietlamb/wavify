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
import ButtonLoader from "../me/ButtonLoader";

export const DeleteSpaceModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const supabase = createClientComponentClient<Database>();
  const isModalOpen = isOpen && type === "deleteSpace";
  const { collective, space, spaces } = data;

  const [isLoading, setIsLoading] = useState(false);
  if (!spaces || !space || !collective || !Array.isArray(collective.spaces))
    return null;
  const onClick = async () => {
    setIsLoading(true);
    const spacesToUpdate =
      collective.spaces && Array.isArray(collective.spaces)
        ? collective.spaces.filter((item) => item !== space.id)
        : [];
    const { error } = await supabase
      .from("collectives")
      .update({ spaces: spacesToUpdate })
      .eq("id", collective.id);
    if (error) throw error;
    const { error: spaceError } = await supabase
      .from("spaces")
      .delete()
      .eq("id", space.id);
    if (spaceError) throw spaceError;
    onClose();
    setIsLoading(false);
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
            <span className="font-semibold text-primary">
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
