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
  | "deleteMessage";

interface ModalData {
  collective?: Collective;
  userData?: User[];
  user?: User;
  space?: Json;
  spaceType?: SpaceType;
  apiUrl?: string;
  query?: Record<string, any>;
  chat?: Chat;
  message?: Json;
  setFiles?: (files: Json) => void;
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
