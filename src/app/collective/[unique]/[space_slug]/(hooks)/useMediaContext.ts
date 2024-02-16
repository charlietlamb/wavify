import { createContext, useContext } from "react";

interface MediaContext {
  goHome: () => void;
}

export const MediaContext = createContext<MediaContext | undefined>(undefined);

export function useMediaContext() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMediaContext must be used within a MediaProvider");
  }
  return context;
}
