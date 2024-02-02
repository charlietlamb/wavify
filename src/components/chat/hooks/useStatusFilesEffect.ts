import { Dispatch, SetStateAction, useEffect } from "react";

export function useStatusFilesEffect(
  statusFiles: "success" | "pending" | "error",
  initFiles: boolean,
  setInitFiles: (init: boolean) => void,
  bottomRefFiles: React.RefObject<HTMLDivElement>,
  files: MessagesToRender,
  setMessagesToRenderFiles: Dispatch<
    SetStateAction<MessagesToRender | undefined>
  >,
  lastFetchedFiles: string
) {
  useEffect(() => {
    if (statusFiles === "success") {
      if (!initFiles) {
        setInitFiles(true);
        setTimeout(() => {
          bottomRefFiles.current?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
      setMessagesToRenderFiles(files);
    }
  }, [lastFetchedFiles]);
}
