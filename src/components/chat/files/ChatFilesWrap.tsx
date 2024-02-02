import { useContext } from "react";
import ChatSearch from "../ChatSearch";
import ChatFilesContainer from "./ChatFilesContainer";
import { FilesContext, useFilesContext } from "./context";

export default function ChatFilesWrap() {
  const context = useFilesContext();
  const { searchData, filesRef } = context;
  return (
    <div className="hidden lg:flex flex-col w-[30%] items-center">
      <ChatSearch
        className="w-[90%] my-2"
        searchData={searchData ? searchData : [null]}
      ></ChatSearch>

      <div
        className="w-full h-full px-4 overflow-y-auto rounded-md"
        ref={filesRef}
      >
        <ChatFilesContainer />
      </div>
    </div>
  );
}
