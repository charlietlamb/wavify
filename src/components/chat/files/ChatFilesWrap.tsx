import { useContext } from "react";
import ChatSearch from "../ChatSearch";
import ChatFilesContainer from "./ChatFilesContainer";
import { FilesContext, useFilesContext } from "./context";

export default function ChatFilesWrap() {
  const context = useFilesContext();
  const { searchData, filesRef } = context;
  return (
    <div className="flex flex-grow flex-col w-full items-center ">
      <ChatSearch
        className="w-[90%] my-2"
        searchData={searchData ? searchData : [null]}
      ></ChatSearch>

      <div
        className="w-full h-auto px-4 overflow-y-auto rounded-md flex-grow"
        ref={filesRef}
      >
        <ChatFilesContainer />
      </div>
    </div>
  );
}
