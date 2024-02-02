import { createContext, useContext } from "react";

interface ChatFilesWrapContext {
  chat: Chat;
  user: User;
  searchData: (MessageAndAuthor | null)[];
  filesRef: React.MutableRefObject<HTMLDivElement | null>;
  statusFiles: "pending" | "error" | "success";
  bottomRefFiles: React.MutableRefObject<HTMLDivElement | null>;
  renderFiles: (MessageAndAuthor | null)[];
  hasNextPageFiles: boolean;
  fetchNextPageFiles: () => void;
  isFetchingNextPageFiles: boolean;
}

export const FilesContext = createContext<ChatFilesWrapContext | undefined>(
  undefined
);

export function useFilesContext() {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFilesContext must be used within a FilesProvider");
  }
  return context;
}
