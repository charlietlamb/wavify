import ChatSearch from '../ChatSearch'
import ChatFilesContainer from './ChatFilesContainer'
import { useFilesContext } from './context'

export default function ChatFilesWrap() {
  const context = useFilesContext()
  const { chat, searchData, filesRef } = context
  return (
    <div className="flex w-full flex-grow flex-col items-center ">
      <ChatSearch
        className="my-2 w-[90%]"
        chat={chat}
        searchData={searchData ? searchData : [null]}
      ></ChatSearch>

      <div
        className="h-auto w-full flex-grow overflow-y-auto rounded-md px-4"
        ref={filesRef}
      >
        <ChatFilesContainer />
      </div>
    </div>
  )
}
