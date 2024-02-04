import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

export function useStatusFilesEffect(
  statusFiles: "success" | "pending" | "error",
  initFiles: boolean,
  setInitFiles: (init: boolean) => void,
  bottomRefFiles: React.RefObject<HTMLDivElement>,
  files: MessagesToRender,
  setMessagesToRenderFiles: Dispatch<
    SetStateAction<MessagesToRender | undefined>
  >,
  lastFetchedFiles: string,
  messagesToRenderFilesStore: MutableRefObject<MessagesToRender | undefined>
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
      if (messagesToRenderFilesStore)
        messagesToRenderFilesStore.current = files;
      setMessagesToRenderFiles(files);
    }
  }, [lastFetchedFiles]);
}
