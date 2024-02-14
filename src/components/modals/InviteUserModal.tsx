"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "../../../hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { useOrigin } from "../../../hooks/use-origin";
import { useState } from "react";

export const InviteUserModal = ({ user }: { user: User }) => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invite";
  const { collective } = data;
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const inviteUrl: string = collective
    ? `${origin}/collective/${collective.unique}`
    : "";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="py-8 px-6 overflow-hidden ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-left ">
            Invite a friend
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <Label className="text-xs font-bold uppercase text-primary">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className=" border-0 bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              defaultValue={inviteUrl}
            />
            <Button disabled={loading} onClick={onCopy} size="icon">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
