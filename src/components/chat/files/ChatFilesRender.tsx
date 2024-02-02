import ChatFile from "./ChatFile";
import { useFilesContext } from "./context";

export default function ChatFilesRender() {
  const context = useFilesContext();
  const { renderFiles, chat, user } = context;
  return renderFiles.map(
    (message: MessageAndAuthor | null) =>
      message?.files &&
      !message?.deleted && (
        <ChatFile
          key={"file" + message.id}
          chat={chat}
          user={user}
          message={message}
        />
      )
  );
}
