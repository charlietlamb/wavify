import ChatFileCollection from './ChatFileCollection'
import ChatFileCollective from './ChatFileCollective'
import ChatFileMember from './ChatFileMember'
import ChatFileProduct from './ChatFileProduct'
import ChatFileResource from './ChatFileResource'
import { useChatItemContext } from './context/chatItemContext'

export default function ChatFileExternal() {
  const { message } = useChatItemContext()
  return (
    <>
      {message.resource ? (
        <ChatFileResource />
      ) : message.product ? (
        <ChatFileProduct />
      ) : message.collective ? (
        <ChatFileCollective />
      ) : message.collection ? (
        <ChatFileCollection />
      ) : message.member ? (
        <ChatFileMember />
      ) : null}
    </>
  )
}
