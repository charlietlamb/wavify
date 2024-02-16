import { Dispatch, SetStateAction, useEffect } from "react";

export default function useStatusMessageEffect(
  status: "success" | "pending" | "error",
  init: boolean,
  setInit: Dispatch<SetStateAction<boolean>>,
  bottomRef: React.RefObject<HTMLDivElement>,
  messages: MessagesToRender,
  setMessagesToRender: Dispatch<SetStateAction<MessagesToRender | undefined>>,
  lastFetched: string,
  messageToRenderStore: React.MutableRefObject<MessagesToRender | undefined>,
  chatRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    if (status === "success") {
      messageToRenderStore.current = messages;
      setMessagesToRender(messages);
    }
  }, [lastFetched]);
}
