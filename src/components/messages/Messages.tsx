'use client'

import { useState } from 'react'
import { MessagesContext } from './context/messagesContext'
import MessagesContent from './MessagesContent'
import MessagesToolbar from './MessagesToolbar'

export default function Messages({ chat }: { chat: ChatAndUser }) {
  const [chats, setChats] = useState<ChatAndUser[]>([chat])
  const [query, setQuery] = useState('')
  return (
    <MessagesContext.Provider
      value={{ chat, query, setQuery, chats, setChats }}
    >
      <div className="flex w-full divide-x divide-zinc-700">
        <MessagesToolbar />
        <MessagesContent />
      </div>
    </MessagesContext.Provider>
  )
}
