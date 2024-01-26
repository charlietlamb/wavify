import { redirect } from "next/navigation";

import { ChatHeader } from "@/components/chat/ChatHeader";
import getUser from "@/app/actions/getUser";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getOrCreateConversation } from "@/lib/chat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";

interface MemberIdPageProps {
  params: {
    user_id: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const ChatPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const user = await getUser();
  const supabase = createServerComponentClient({ cookies });

  const { data: otherUser } = (await supabase
    .from("users")
    .select()
    .eq("username", params.user_id)
    .single()) as { data: User };

  if (!user) {
    redirect("/account");
  }
  if (!otherUser) {
    return redirect(`/`);
  }

  var conversation: Chat[] | Chat | null = await getOrCreateConversation(
    user.id,
    otherUser.id
  );
  if (Array.isArray(conversation)) {
    conversation = conversation[0];
  }

  const chat: Chat | null = conversation;

  if (!conversation) {
    return redirect(`/`);
  }

  function isObject(value: any): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  return (
    <div className="bg-background flex flex-col h-[80vh]">
      <ChatHeader
        imageUrl="https://github.com/shadcn.png"
        otherUser={otherUser}
        user={user}
        type="conversation"
      />
      {/*searchParams.video && (
          <MediaRoom
            chatId={isObject(conversation) ? conversation.id : null}
            video={true}
            audio={true}
          />
        )*/}
      {!searchParams.video && (
        <div className="flex-grow overflow-auto">
          <ChatMessages
            user={user}
            chat={chat ? chat : null}
            type="chat"
            name={
              isObject(otherUser) && otherUser.username
                ? otherUser.username
                : "undefined"
            }
          />
        </div>
      )}
      {chat && (
        <ChatInput
          chat={chat}
          type="conversation"
          user={user}
          name={otherUser.username ? otherUser.username : ""}
        />
      )}
    </div>
  );
};

export default ChatPage;
