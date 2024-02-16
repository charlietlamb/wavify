import { MutableRefObject, useEffect } from "react";
type DisplayFile = {
  file: File;
  id: string;
};
export function useUploadScrollEffect(
  displayFiles: DisplayFile[],
  scrollRef: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (displayFiles.length && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayFiles, scrollRef]);
}
