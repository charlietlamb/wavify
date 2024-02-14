import { ChatItem } from "./ChatItem";
import { useItemContext } from "./context";

export default function ChatItemMap() {
  const context = useItemContext();
  const { render, user, colUser } = context;
  return render.map(
    (message: MessageAndAuthor | null) =>
      message && (
        <ChatItem
          key={message.id}
          user={user}
          message={message}
          colUser={colUser}
        />
      )
  );
}
