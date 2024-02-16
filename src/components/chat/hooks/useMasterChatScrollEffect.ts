import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

export function useMasterChatScrollEffect(
  render: (MessageAndAuthor | null)[],
  chatRef: React.RefObject<HTMLDivElement>,
  pages: number,
  setPages: Dispatch<SetStateAction<number>>,
  scrollStore: MutableRefObject<number>,
  type: "new" | "old"
): void {
  useEffect(() => {
    if (render.length && chatRef.current) {
      if (pages === 0) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      } else if (type === "old") {
        chatRef.current.scrollTop =
          chatRef.current.scrollHeight - scrollStore.current;
      } else if (
        chatRef.current.scrollHeight -
          chatRef.current.scrollTop -
          chatRef.current.clientHeight <=
        1000
      ) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
      scrollStore.current = chatRef.current.scrollHeight;
      setPages((prev) => prev + 1);
    }
  }, [render, chatRef]);
}
