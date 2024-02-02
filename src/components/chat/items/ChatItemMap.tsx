import { ChatItem } from "./ChatItem";
import { useItemContext } from "./context";

export default function ChatItemMap() {
  const context = useItemContext();
  const { render, chat, user } = context;
  return render.map(
    (message: MessageAndAuthor | null) =>
      message && (
        <ChatItem key={message.id} chat={chat} user={user} message={message} />
      )
  );
}
