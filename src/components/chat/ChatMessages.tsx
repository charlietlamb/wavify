'use client'

import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useChatScroll } from '../../../hooks/use-chat-scroll'
import ChatFilesWrap from './files/ChatFilesWrap'
import ChatItemWrap from './items/ChatItemWrap'
import { FilesContext } from './files/context'
import { ItemContext } from './items/context'
import { useFileUpdateEffect } from './hooks/useFileUpdateEffect'
import { useMessageUpdateEffect } from './hooks/useMessageUpdateEffect'
import { useMessageDeletedEffect } from './hooks/useMessageDeletedEffect'
import { useMessageSentEffect } from './hooks/useMessageSentEffect'
import useStatusMessageEffect from './hooks/useStatusMessageEffect'
import { getFiles } from './functions/getFiles'
import { getMessages } from './functions/getMessages'
import { useMasterChatScrollEffect } from './hooks/useMasterChatScrollEffect'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import { ChatState } from '@/state/chat/chatSlice'
import { RootState } from '@/state/store'
import { useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
interface ChatMessagesProps {
  name: string
  chat: Chat | null
  type: 'space' | 'chat'
  fileTab?: boolean
  searchData?: (FileAndSender | null)[]
}

//need to fix scroll on here
export function ChatMessages({
  name,
  chat,
  type,
  fileTab,
  searchData,
}: ChatMessagesProps) {
  if (chat === null) {
    throw new Error('No chat found')
  }
  if (fileTab === undefined) fileTab = false
  const chatRef = useRef<HTMLDivElement>(null)
  const filesRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const bottomRefFiles = useRef<HTMLDivElement>(null)
  const [bottomRefState, setBottomRefState] = useState<HTMLDivElement | null>(
    null
  )
  const [bottomRefStateFiles, setBottomRefStateFiles] =
    useState<HTMLDivElement | null>(null)
  const [messagesToRender, setMessagesToRender] = useState<MessagesToRender>()
  const [messagesToRenderFiles, setMessagesToRenderFiles] =
    useState<MessagesToRender>()
  const [render, setRender] = useState<(MessageData | null)[]>([])
  const [renderFiles, setRenderFiles] = useState<(MessageData | null)[]>([])
  const renderStore = useRef<(MessageData | null)[]>([])
  const renderFilesStore = useRef<(MessageData | null)[]>([])
  const [pages, setPages] = useState(0)
  const [pagesFiles, setPagesFiles] = useState(0)
  const chatScrollStore = useRef(0)
  const filesScrollStore = useRef(0)
  const [recentType, setRecentType] = useState<'new' | 'old'>('old')
  const [recentTypeFiles, setRecentTypeFiles] = useState<'new' | 'old'>('old')
  const [newMessagesToRender, setNewMessagesToRender] = useState<MessageData[]>(
    []
  )
  const [newMessagesToRenderFiles, setNewMessagesToRenderFiles] = useState<
    MessageData[]
  >([])
  const [lastFetched, setLastFetched] = useState('')
  const [lastFetchedFiles, setLastFetchedFiles] = useState('')
  const messagesToRenderStore = useRef<MessagesToRender>()
  const messagesToRenderFilesStore = useRef<MessagesToRender>()
  const newMessagesToRenderStore = useRef<(MessageData | null)[]>([])
  const newMessagesToRenderFilesStore = useRef<(MessageData | null)[]>([])
  const chatState: ChatState = useSelector((state: RootState) => state.chat)
  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: ({ pageParam = 1 }) =>
      getMessages({ pageParam, setLastFetched, setRecentType, chat }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MessageData[], allPages) => {
      if (lastPage?.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useChatScroll({
    chatRef,
    bottomRef: bottomRefState,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    newMessages: newMessagesToRender,
  })

  const {
    data: files,
    fetchNextPage: fetchNextPageFiles,
    hasNextPage: hasNextPageFiles,
    isFetchingNextPage: isFetchingNextPageFiles,
    status: statusFiles,
  } = useInfiniteQuery({
    queryKey: ['files'],
    queryFn: ({ pageParam = 1 }) =>
      getFiles({ pageParam, setLastFetchedFiles, setRecentTypeFiles, chat }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MessageData[], allPages) => {
      if (lastPage?.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useChatScroll({
    chatRef: filesRef,
    bottomRef: bottomRefStateFiles,
    loadMore: fetchNextPageFiles,
    shouldLoadMore: !isFetchingNextPageFiles && !!hasNextPageFiles,
    newMessages: newMessagesToRenderFiles,
  })

  useStatusMessageEffect(
    status,
    messages ? messages : { pages: [] },
    setMessagesToRender,
    lastFetched,
    messagesToRenderStore
  )

  useStatusMessageEffect(
    statusFiles,
    files ? files : { pages: [] },
    setMessagesToRenderFiles,
    lastFetchedFiles,
    messagesToRenderFilesStore
  )

  useMessageSentEffect(
    chat,
    setNewMessagesToRender,
    setNewMessagesToRenderFiles,
    newMessagesToRender,
    newMessagesToRenderFiles,
    newMessagesToRenderStore,
    newMessagesToRenderFilesStore,
    setRecentType,
    setRecentTypeFiles
  )

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
  )

  useMessageUpdateEffect(
    messagesToRender || { pages: [] },
    newMessagesToRender,
    setRender,
    renderStore
  )

  useFileUpdateEffect(
    messagesToRenderFiles || { pages: [] },
    newMessagesToRenderFiles,
    setRenderFiles,
    renderFilesStore
  )

  useMasterChatScrollEffect(
    render,
    chatRef,
    pages,
    setPages,
    chatScrollStore,
    recentType
  )
  useMasterChatScrollEffect(
    renderFiles,
    filesRef,
    pagesFiles,
    setPagesFiles,
    filesScrollStore,
    recentTypeFiles
  )

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex max-h-full w-full flex-grow overflow-hidden"
    >
      {fileTab && (
        <ResizablePanel
          defaultSize={fileTab ? 30 : 0}
          className={cn('hidden md:flex', chatState.toggle && 'flex md:flex')}
        >
          <FilesContext.Provider
            value={{
              chat,
              searchData: searchData ? searchData : [],
              filesRef,
              statusFiles,
              bottomRefFiles,
              renderFiles,
              hasNextPageFiles,
              fetchNextPageFiles,
              isFetchingNextPageFiles,
              setBottomRefStateFiles,
            }}
          >
            <ChatFilesWrap />
          </FilesContext.Provider>
        </ResizablePanel>
      )}
      {fileTab && <ResizableHandle />}
      <ResizablePanel
        defaultSize={fileTab ? 70 : 100}
        minSize={50}
        className={cn('flex', chatState.toggle && 'hidden md:flex')}
      >
        <ItemContext.Provider
          value={{
            chatRef,
            bottomRef,
            render,
            chat,
            type,
            fileTab,
            hasNextPage,
            isFetchingNextPage,
            fetchNextPage,
            name,
            status,
            setBottomRefState,
          }}
        >
          <ChatItemWrap />
        </ItemContext.Provider>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
