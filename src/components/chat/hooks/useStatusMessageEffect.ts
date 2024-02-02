import { Dispatch, SetStateAction, useEffect } from "react";

export default function useStatusMessageEffect(
  status: "success" | "pending" | "error",
  init: boolean,
  setInit: (init: boolean) => void,
  bottomRef: React.RefObject<HTMLDivElement>,
  messages: MessagesToRender,
  setMessagesToRender: Dispatch<SetStateAction<MessagesToRender | undefined>>,
  lastFetched: string
) {
  useEffect(() => {
    if (status === "success") {
      if (!init) {
        setInit(true);
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
      setMessagesToRender(messages);
    }
  }, [lastFetched]);
}
