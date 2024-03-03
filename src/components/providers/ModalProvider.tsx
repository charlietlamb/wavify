'use client'

import { useEffect, useState } from 'react'

import { CreateCollectiveModal } from '@/components/modals/CreateCollectiveModal'
import { InviteUserModal } from '@/components/modals/InviteUserModal'
import { EditCollectiveModal } from '@/components/modals/EditCollectiveModal'
import { MembersModal } from '@/components/modals/ManageUsersModal'
import { CreateSpaceModal } from '@/components/modals/CreateSpaceModal'
import { DeleteCollectiveModal } from '@/components/modals/DeleteCollectiveModal'
import { LeaveCollectiveModal } from '@/components/modals/LeaveCollectiveModal'
import { DeleteSpaceModal } from '@/components/modals/DeleteSpaceModal'
import { EditSpaceModal } from '@/components/modals/EditSpaceModal'
import { MessageFileModal } from '@/components/modals/MessageFileModal'
import { DeleteMessageModal } from '@/components/modals/DeleteMessageModal'
import { DeleteRoleModal } from '../modals/DeleteRoleModal'
import ThemeModal from '../modals/ThemeModal'
import { UploadFileModal } from '../files/modals/UploadFileModal'
import { CreateFolderModal } from '../files/modals/CreateFolderModal'
import { DeleteFolderModal } from '../files/modals/DeleteFolderModal'
import { EditFolderModal } from '../files/modals/EditFolderModal'
import { DeleteFileModal } from '../files/modals/DeleteFileModal'
import { EditFileModal } from '../files/modals/EditFileModal'
import { ReturnPostModal } from '../files/modals/ReturnPostModal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateCollectiveModal />
      <InviteUserModal />
      <EditCollectiveModal />
      <MembersModal />
      <CreateSpaceModal />
      <DeleteCollectiveModal />
      <LeaveCollectiveModal />
      <DeleteSpaceModal />
      <EditSpaceModal />
      <MessageFileModal />
      <DeleteMessageModal />
      <DeleteRoleModal />
      <ThemeModal />
      <UploadFileModal />
      <CreateFolderModal />
      <DeleteFolderModal />
      <EditFolderModal />
      <DeleteFileModal />
      <EditFileModal />
      <ReturnPostModal />
    </>
  )
}
