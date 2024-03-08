import { RoleItemContext } from '@/components/collective/roles/context'
import { Dispatch, SetStateAction } from 'react'
import { create } from 'zustand'

export type ModalType =
  | 'createCollective'
  | 'invite'
  | 'editCollective'
  | 'members'
  | 'createSpace'
  | 'leaveCollective'
  | 'deleteCollective'
  | 'deleteSpace'
  | 'editSpace'
  | 'messageFile'
  | 'deleteMessage'
  | 'deleteRole'
  | 'theme'
  | 'upload'
  | 'createFolder'
  | 'deleteFolder'
  | 'editFolder'
  | 'deleteFile'
  | 'editFile'
  | 'returnPost'
  | 'updateTimer'
  | 'schedule'
  | 'removeTransient'
  | 'deleteSchedule'
  | 'editPreview'
  | 'removeFeedback'
  | 'leaveComment'
  | 'comments'

interface ModalData {
  collective?: Collective
  colUsers?: ColUserAndData[]
  user?: User
  space?: Space
  spaces?: Space[]
  spaceType?: string
  apiUrl?: string
  query?: Record<string, any>
  chat?: Chat
  message?: MessageData
  setFiles?: (files: Json) => void
  roles?: Role[]
  role?: Role
  roleContext?: RoleItemContext
  rolesAndAllowed?: RoleAndAllowed[]
  messageFileType?: 'conversation' | 'space'
  files?: FileAndSender[]
  folders?: FolderAndSender[]
  parent?: string | null
  folder?: FolderAndSender
  file?: FileAndSender
  schedule?: Schedule | undefined
  schedules?: Schedule[]
  transientFolders?: FolderAndSender[]
  setTransientFolders?: Dispatch<SetStateAction<FolderAndSender[]>>
  setSchedules?: Dispatch<SetStateAction<Schedule[]>>
  heading?: string
  description?: string
  setComments?: Dispatch<SetStateAction<CommentAndUser[]>>
  feedbackGive?: boolean
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}))
