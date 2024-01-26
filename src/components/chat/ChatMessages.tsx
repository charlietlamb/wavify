"use client";

import { useRef, useEffect, useState } from "react";
import { Loader2, ServerCrash } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatWelcome } from "./ChatWelcome";
import { ChatItem } from "./ChatItem";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import isObject from "@/lib/isObject";

interface ChatMessagesProps {
  name: string;
  user: User;
  chat: Chat | null;
  space?: Json;
  collective?: Collective;
  type: "space" | "chat";
}

type MessagesToRender = {
  pages: (MessageAndAuthor[] | null)[];
  // ... other properties of messagesToRender ...
};

export const ChatMessages = ({
  name,
  user,
  chat,
  space,
  type,
  collective,
}: ChatMessagesProps) => {
  if (chat === null) return null;
  const chatRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();
  const [messagesToRender, setMessagesToRender] = useState<MessagesToRender>();
  const [render, setRender] = useState<(MessageAndAuthor | null)[]>([]);
  const renderStore = useRef<(MessageAndAuthor | null)[]>([]);
  const [newMessagesToRender, setNewMessagesToRender] = useState<
    MessageAndAuthor[]
  >([]);
  const [lastFetched, setLastFetched] = useState("");
  const messagesInOrder = Array.isArray(chat.messages)
    ? chat?.messages?.sort((a, b) =>
        isObject(a) &&
        isObject(b) &&
        typeof a.createdAt === "string" &&
        typeof b.createdAt === "string"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : 0
      )
    : [];

  const messageIds: string[] = Array.isArray(messagesInOrder)
    ? messagesInOrder.map((message: Json) =>
        isObject(message) && typeof message.id === "string" ? message.id : ""
      )
    : [];
  const getMessages = async ({
    pageParam,
  }: {
    pageParam: number | undefined;
  }) => {
    if (pageParam === undefined) throw new Error("No page param");
    const response = await supabase
      .from("messages")
      .select(
        `
            *,
            users ( username, profile_pic_url)
        `
      )
      .in("id", messageIds.slice((pageParam - 1) * 5, (pageParam - 1) * 5 + 5));
    // Check if the request was successful
    if (response.error) {
      throw new Error(response.error.message);
    }

    // Return the data from the response
    if (response.data.length > 0) setLastFetched(response.data[0].id);
    return response.data;
  };

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    initialPageParam: 1,
    getNextPageParam: (lastPage: MessageAndAuthor[], allPages) => {
      if (lastPage?.length === 0) return undefined;
      return allPages.length + 1;
    },
  });

  function isJson(value: unknown): value is Json {
    switch (typeof value) {
      case "string":
      case "number":
      case "boolean":
        return true;
      case "object":
        if (Array.isArray(value)) {
          return value.every(isJson);
        }
        if (value === null) {
          return true;
        }
        return value && Object.values(value).every(isJson);
      default:
        return false;
    }
  }

  function isMessageAuthor(value: unknown): value is MessageAuthor {
    return (
      typeof value === "object" &&
      value !== null &&
      "users" in value &&
      typeof value.users === "object" &&
      value.users !== null &&
      "username" in value.users &&
      typeof value.users.username === "string" &&
      "profile_pic_url" in value.users &&
      typeof value.users.profile_pic_url === "string"
    );
  }

  async function newMessageSent() {
    const { data: newMessageIdArray } = await supabase
      .from("chats")
      .select("messages")
      .eq("id", chat ? chat.id : "")
      .single();
    if (!Array.isArray(newMessageIdArray?.messages)) return;
    const newArray: string[] = newMessageIdArray?.messages.filter(
      (item: Json) =>
        isObject(item) &&
        typeof item.id === "string" &&
        !messageIds.includes(item.id)
    );
    var newRenders: MessageAndAuthor[] = [];
    await newArray.forEach(async (message: Json) => {
      const response = await supabase
        .from("messages")
        .select(
          `
            *,
            users ( username, profile_pic_url)
        `
        )
        .eq("id", isObject(message) ? message.id : "")
        .single();
      if (response.error) {
        throw new Error(response.error.message);
      }
      if (isObject(response.data)) {
        const messageAndAuthorNew: MessageAndAuthor = {
          author:
            typeof response.data.author === "string"
              ? response.data.author
              : "",
          chat:
            typeof response.data.chat === "string" ? response.data.chat : "",
          content:
            typeof response.data.content === "string"
              ? response.data.content
              : null,
          createdAt:
            typeof response.data.createdAt === "string"
              ? response.data.createdAt
              : null,
          deleted:
            typeof response.data.deleted === "boolean"
              ? response.data.deleted
              : null,
          edited:
            typeof response.data.edited === "boolean"
              ? response.data.edited
              : null,
          editedAt:
            typeof response.data.editedAt === "string"
              ? response.data.editedAt
              : null,
          files: isJson(response.data.files) ? response.data.files : null,
          id: typeof response.data.id === "string" ? response.data.id : "",
          users: isMessageAuthor(response.data.users)
            ? {
                username: response.data.users.users.username,
                profile_pic_url: response.data.users.users.profile_pic_url,
              }
            : { username: "", profile_pic_url: "" },
        };
        newRenders = [...newRenders, messageAndAuthorNew];
        setNewMessagesToRender(newRenders);
      }
    });
    if (newRenders) {
      console.log(newRenders);
    }
  }
  useEffect(() => {
    if (!chatRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentSentinel = chatRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    } else {
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [lastFetched]);

  useEffect(() => {
    if (status === "success") {
      setMessagesToRender(messages);
      if (wrapperRef.current) {
        wrapperRef.current.scrollTop =
          wrapperRef.current.scrollHeight - wrapperRef.current.clientHeight;
      }
    }
  }, [lastFetched]);

  useEffect(() => {
    const channel = supabase
      .channel("messages" + chat.id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (
            newPayload &&
            typeof newPayload === "object" &&
            newPayload.id === chat.id
          ) {
            newMessageSent();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user.id]);

  useEffect(() => {
    const channel = supabase
      .channel("message_deleted" + chat.id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          console.log(newPayload);
          console.log(renderStore.current);
          if (renderStore.current) {
            const renderIds = renderStore.current.map((item) =>
              isObject(item) ? item.id : ""
            );
            console.log(renderIds);
            if (
              newPayload &&
              typeof newPayload === "object" &&
              renderIds.includes(newPayload.id)
            ) {
              const messageToDelete = await supabase
                .from("messages")
                .select(
                  `
                  *,
                  users ( username, profile_pic_url)
              `
                )
                .eq("id", isObject(newPayload) ? newPayload.id : "")
                .single();
              const newMessages = [
                ...(renderStore.current.filter(
                  (message) =>
                    isObject(message) && message.id !== messageToDelete.data.id
                ) ?? []),
                messageToDelete.data,
              ].sort(
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
              setRender(newMessages);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user.id]);

  useEffect(() => {
    if (Array.isArray(messagesToRender?.pages)) {
      const flattenedMessages = messagesToRender.pages
        .flatMap((page) => (Array.isArray(page) ? page : [page]))
        .filter((item) => item !== null);
      const toSet = [...newMessagesToRender, ...flattenedMessages];
      if (toSet.includes(null) || typeof toSet === "undefined") {
        throw new Error("Null in messages");
      } else {
        console.log("--to-set--");
        console.log(toSet);
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
          setRender(toSetSorted);
          console.log("-SETTING-RENDER-STORE-");
          renderStore.current = toSetSorted;
          console.log(renderStore.current);
        } else {
          console.log("toSetSorted is null or undefined");
        }
      }
    }
  }, [messagesToRender, newMessagesToRender]);

  useEffect(() => {
    console.log("--RENDER-STORE--");
    console.log(renderStore.current);
  }, [renderStore.current]);

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 flex-grow">
        <Loader2 className="my-4 h-7 w-7 text-zinc-500 animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 flex-grow">
        <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col flex-1 flex-grow px-4 py-4 overflow-y-auto hide-scrollbar"
      ref={wrapperRef}
    >
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="w-6 h-6 my-4 text-zinc-500 animate-spin" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="my-4 text-xs transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto gap-y-1">
        {Array.isArray(render) &&
          render.map(
            (message: MessageAndAuthor | null) =>
              message && (
                <ChatItem
                  key={message.id}
                  chat={chat}
                  user={user}
                  message={message}
                />
              )
          )}

        <div className="h-[1px]" ref={chatRef}></div>
      </div>
      <div />
    </div>
  );
};
