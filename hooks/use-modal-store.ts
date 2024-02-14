import { RoleItemContext } from "@/components/collective/roles/context";
import { create } from "zustand";

export type ModalType =
  | "createCollective"
  | "invite"
  | "editCollective"
  | "members"
  | "createSpace"
  | "leaveCollective"
  | "deleteCollective"
  | "deleteSpace"
  | "editSpace"
  | "messageFile"
  | "deleteMessage"
  | "deleteRole";

interface ModalData {
  collective?: Collective;
  colUsers?: ColUserAndData[];
  user?: User;
  space?: Space;
  spaces?: Space[];
  spaceType?: string;
  apiUrl?: string;
  query?: Record<string, any>;
  chat?: Chat;
  message?: Message;
  setFiles?: (files: Json) => void;
  roles?: Role[];
  role?: Role;
  roleContext?: RoleItemContext;
  rolesAndAllowed?: RoleAndAllowed[];
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
