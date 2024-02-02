"use client";

import { useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useChatScroll } from "../../../hooks/use-chat-scroll";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ChatFilesWrap from "./files/ChatFilesWrap";
import ChatItemWrap from "./items/ChatItemWrap";
import { FilesContext } from "./files/context";
import { ItemContext } from "./items/context";
import { useFileUpdateEffect } from "./hooks/useFileUpdateEffect";
import { useMessageUpdateEffect } from "./hooks/useMessageUpdateEffect";
import { useMessageDeletedEffect } from "./hooks/useMessageDeletedEffect";
import { useMessageSentEffect } from "./hooks/useMessageSentEffect";
import { useStatusFilesEffect } from "./hooks/useStatusFilesEffect";
import { isMessagesToRender } from "./utilityFunctions";
import useStatusMessageEffect from "./hooks/useStatusMessageEffect";
import { getFiles } from "./functions/getFiles";
import { getMessages } from "./functions/getMessages";

interface ChatMessagesProps {
  name: string;
  user: User;
  chat: Chat | null;
  space?: Json;
  collective?: Collective;
  type: "space" | "chat";
  fileTab?: boolean;
  fileIds: string[];
  messageIds: string[];
  searchData?: (MessageAndAuthor | null)[];
}

//need to fix scroll on here
export function ChatMessages({
  name,
  user,
  chat,
  space,
  type,
  collective,
  fileTab,
  messageIds,
  fileIds,
  searchData,
}: ChatMessagesProps) {
  if (chat === null) return null;
  if (fileTab === undefined) fileTab = false;
  const chatRef = useRef<HTMLDivElement>(null);
  const filesRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomRefFiles = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();
  const [messagesToRender, setMessagesToRender] = useState<MessagesToRender>();
  const [messagesToRenderFiles, setMessagesToRenderFiles] =
    useState<MessagesToRender>();
  const [render, setRender] = useState<(MessageAndAuthor | null)[]>([]);
  const [renderFiles, setRenderFiles] = useState<(MessageAndAuthor | null)[]>(
    []
  );
  const renderStore = useRef<(MessageAndAuthor | null)[]>([]);
  const renderFilesStore = useRef<(MessageAndAuthor | null)[]>([]);
  const [init, setInit] = useState(false);
  const [initFiles, setInitFiles] = useState(false);
  const [newMessagesToRender, setNewMessagesToRender] = useState<
    MessageAndAuthor[]
  >([]);
  const [newMessagesToRenderFiles, setNewMessagesToRenderFiles] = useState<
    MessageAndAuthor[]
  >([]);
  const [lastFetched, setLastFetched] = useState("");
  const [lastFetchedFiles, setLastFetchedFiles] = useState("");

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages({ pageParam: 1, messageIds, setLastFetched }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MessageAndAuthor[], allPages) => {
      if (lastPage?.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    newMessages: newMessagesToRender,
  });

  const {
    data: files,
    fetchNextPage: fetchNextPageFiles,
    hasNextPage: hasNextPageFiles,
    isFetchingNextPage: isFetchingNextPageFiles,
    status: statusFiles,
  } = useInfiniteQuery({
    queryKey: ["files"],
    queryFn: () => getFiles({ pageParam: 1, fileIds, setLastFetchedFiles }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MessageAndAuthor[], allPages) => {
      if (lastPage?.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
  useChatScroll({
    chatRef: filesRef,
    bottomRef: bottomRefFiles,
    loadMore: fetchNextPageFiles,
    shouldLoadMore: !isFetchingNextPageFiles && !!hasNextPageFiles,
    newMessages: newMessagesToRenderFiles,
  });

  useStatusMessageEffect(
    status,
    init,
    setInit,
    bottomRef,
    isMessagesToRender(messages) ? messages : { pages: [] },
    setMessagesToRender,
    lastFetched
  );

  useStatusFilesEffect(
    statusFiles,
    initFiles,
    setInitFiles,
    bottomRefFiles,
    isMessagesToRender(files) ? files : { pages: [] },
    setMessagesToRenderFiles,
    lastFetchedFiles
  );

  useMessageSentEffect(
    chat,
    messageIds,
    setNewMessagesToRender,
    setNewMessagesToRenderFiles
  );

  useMessageDeletedEffect(
    chat,
    renderStore,
    setRender,
    renderFilesStore,
    setRenderFiles
  );

  useMessageUpdateEffect(
    messagesToRender || { pages: [] },
    newMessagesToRender,
    setRender,
    renderStore
  );

  useFileUpdateEffect(
    messagesToRenderFiles || { pages: [] },
    newMessagesToRenderFiles,
    setRenderFiles,
    renderFilesStore
  );

  return (
    <div className="flex w-full h-full">
      {fileTab && (
        <FilesContext.Provider
          value={{
            chat,
            user,
            searchData: searchData ? searchData : [],
            filesRef,
            statusFiles,
            bottomRefFiles,
            renderFiles,
            hasNextPageFiles,
            fetchNextPageFiles,
            isFetchingNextPageFiles,
          }}
        >
          <ChatFilesWrap />
        </FilesContext.Provider>
      )}
      <ItemContext.Provider
        value={{
          chatRef,
          bottomRef,
          render,
          chat,
          user,
          type,
          fileTab,
          hasNextPage,
          isFetchingNextPage,
          fetchNextPage,
          name,
          status,
        }}
      >
        <ChatItemWrap />
      </ItemContext.Provider>
    </div>
  );
}
