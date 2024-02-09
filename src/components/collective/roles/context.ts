import { createContext, useContext } from "react";

export interface RoleItemContext {
  collective: Collective;
  roles: Role[];
  role: Role;
  emoji: string;
  setEmoji: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  permissions: Json;
  setPermissions: React.Dispatch<React.SetStateAction<Json>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}

export const RoleContext = createContext<RoleItemContext | undefined>(
  undefined
);

export function useRoleContext() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useFilesContext must be used within a FilesProvider");
  }
  return context;
}
