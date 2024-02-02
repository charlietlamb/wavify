import ChatFilesLoader from "./ChatFilesLoader";
import ChatFilesRender from "./ChatFilesRender";
import { useFilesContext } from "./context";

export default function () {
  const context = useFilesContext();
  const { bottomRefFiles, hasNextPageFiles } = context;
  return (
    <div className="flex flex-col-reverse w-full gap-y-1">
      <div ref={bottomRefFiles} className="h-[1px]"></div>
      <ChatFilesRender />
      {hasNextPageFiles && <ChatFilesLoader />}
      {!hasNextPageFiles && <div className="flex-1" />}
    </div>
  );
}
