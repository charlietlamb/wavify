import ChatSearch from '../ChatSearch'
import ChatFilesContainer from './ChatFilesContainer'
import { useFilesContext } from './context'

export default function ChatFilesWrap() {
  const context = useFilesContext()
  const { chat, searchData, filesRef } = context
  return (
    <div className="flex w-full flex-grow flex-col items-center divide-y divide-zinc-700">
      <ChatSearch
        className="w-full p-2"
        chat={chat}
        searchData={searchData ? searchData : [null]}
      ></ChatSearch>

      <div
        className="h-auto w-full flex-grow overflow-y-auto p-2"
        ref={filesRef}
      >
        <ChatFilesContainer />
      </div>
    </div>
  )
}
