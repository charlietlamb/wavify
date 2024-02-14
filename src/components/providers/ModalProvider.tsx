"use client";

import { useEffect, useState } from "react";

import { CreateCollectiveModal } from "@/components/modals/CreateCollectiveModal";
import { InviteUserModal } from "@/components/modals/InviteUserModal";
import { EditCollectiveModal } from "@/components/modals/EditCollectiveModal";
import { MembersModal } from "@/components/modals/ManageUsersModal";
import { CreateSpaceModal } from "@/components/modals/CreateSpaceModal";
import { DeleteCollectiveModal } from "@/components/modals/DeleteCollectiveModal";
import { LeaveCollectiveModal } from "@/components/modals/LeaveCollectiveModal";
import { DeleteSpaceModal } from "@/components/modals/DeleteSpaceModal";
import { EditSpaceModal } from "@/components/modals/EditSpaceModal";
import { MessageFileModal } from "@/components/modals/MessageFileModal";
import { DeleteMessageModal } from "@/components/modals/DeleteMessageModal";
import { DeleteRoleModal } from "../modals/DeleteRoleModal";

export const ModalProvider = ({ user }: { user: User }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateCollectiveModal user={user} />
      <InviteUserModal user={user} />
      <EditCollectiveModal user={user} />
      <MembersModal />
      <CreateSpaceModal />
      <DeleteCollectiveModal />
      <LeaveCollectiveModal />
      <DeleteSpaceModal />
      <EditSpaceModal />
      <MessageFileModal />
      <DeleteMessageModal />
      <DeleteRoleModal />
    </>
  );
};
