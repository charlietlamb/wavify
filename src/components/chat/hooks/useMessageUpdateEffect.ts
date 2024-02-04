import isObject from "@/lib/isObject";
import { useEffect, MutableRefObject } from "react";

type MessagesToRender = {
  pages: (MessageAndAuthor[] | null)[];
};

export const useMessageUpdateEffect = (
  messagesToRender: MessagesToRender,
  newMessagesToRender: MessageAndAuthor[],
  setRender: (messages: MessageAndAuthor[]) => void,
  renderStore: MutableRefObject<(MessageAndAuthor | null)[]>
) => {
  useEffect(() => {
    if (Array.isArray(messagesToRender?.pages)) {
      const flattenedMessages = messagesToRender.pages
        .flatMap((page) => (Array.isArray(page) ? page : [page]))
        .filter((item) => item !== null);
      const toSet = [...newMessagesToRender, ...flattenedMessages];
      if (toSet.includes(null) || typeof toSet === "undefined") {
        throw new Error("Null in messages");
      } else {
        const toSetSorted = toSet
          .filter((item) => item !== null)
          .sort(
            (a, b) =>
              new Date(
                isObject(b) && typeof b.createdAt === "string"
                  ? b?.createdAt
                  : ""
              ).getTime() -
              new Date(
                isObject(a) && typeof a.createdAt === "string"
                  ? a?.createdAt
                  : ""
              ).getTime()
          );
        if (
          toSetSorted !== null &&
          toSetSorted !== undefined &&
          Array.isArray(toSetSorted) &&
          toSetSorted.length > 0
        ) {
          const filteredToSetSorted = toSetSorted.filter(
            (item): item is MessageAndAuthor => item !== null
          );
          //error here
          setRender(filteredToSetSorted);
          renderStore.current = toSetSorted;
        }
      }
    }
  }, [messagesToRender, newMessagesToRender]);
};
