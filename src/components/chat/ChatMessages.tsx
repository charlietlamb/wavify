"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useChatScroll } from "../../../hooks/use-chat-scroll";
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
  type: "space" | "chat";
  fileTab?: boolean;
  searchData?: (MessageAndAuthor | null)[];
  colUser?: ColUserAndData;
}

//need to fix scroll on here
export function ChatMessages({
  name,
  user,
  chat,
  type,
  fileTab,
  searchData,
  colUser,
}: ChatMessagesProps) {
  if (chat === null) return null;
  if (fileTab === undefined) fileTab = false;
  const chatRef = useRef<HTMLDivElement>(null);
  const filesRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomRefFiles = useRef<HTMLDivElement>(null);
  const [bottomRefState, setBottomRefState] = useState<HTMLDivElement | null>(
    null
  );
  const [bottomRefStateFiles, setBottomRefStateFiles] =
    useState<HTMLDivElement | null>(null);
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

  const messagesToRenderStore = useRef<MessagesToRender>();
  const messagesToRenderFilesStore = useRef<MessagesToRender>();
  const newMessagesToRenderStore = useRef<(MessageAndAuthor | null)[]>();
  const newMessagesToRenderFilesStore = useRef<(MessageAndAuthor | null)[]>();

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: ({ pageParam = 1 }) => getMessages({ pageParam, setLastFetched }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MessageAndAuthor[], allPages) => {
      if (lastPage?.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
  useChatScroll({
    chatRef,
    bottomRef: bottomRefState,
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
    queryFn: ({ pageParam = 1 }) =>
      getFiles({ pageParam, setLastFetchedFiles }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MessageAndAuthor[], allPages) => {
      if (lastPage?.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
  useChatScroll({
    chatRef: filesRef,
    bottomRef: bottomRefStateFiles,
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
    lastFetched,
    messagesToRenderStore
  );

  useStatusFilesEffect(
    statusFiles,
    initFiles,
    setInitFiles,
    bottomRefFiles,
    isMessagesToRender(files) ? files : { pages: [] },
    setMessagesToRenderFiles,
    lastFetchedFiles,
    messagesToRenderFilesStore
  );

  useMessageSentEffect(
    chat,
    setNewMessagesToRender,
    setNewMessagesToRenderFiles,
    newMessagesToRender,
    newMessagesToRenderFiles,
    newMessagesToRenderStore,
    newMessagesToRenderFilesStore
  );

  useMessageDeletedEffect(
    chat,
    renderStore,
    setMessagesToRender,
    setNewMessagesToRender,
    setMessagesToRenderFiles,
    setNewMessagesToRenderFiles,
    messagesToRenderStore,
    messagesToRenderFilesStore,
    newMessagesToRenderStore,
    newMessagesToRenderFilesStore
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
    <div className="flex flex-grow w-full max-h-full overflow-hidden">
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
            colUser,
            setBottomRefStateFiles,
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
          colUser,
          setBottomRefState,
        }}
      >
        <ChatItemWrap />
      </ItemContext.Provider>
    </div>
  );
}
