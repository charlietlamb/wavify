import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/ChatHeader";
import getUser from "@/app/actions/getUser";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import isObject from "@/lib/isObject";
import { getSearchFilesData } from "./(functions)/getSearchFilesData";
import { getFileIds } from "./(functions)/getFileIds";
import { getMessageIds } from "./(functions)/getMessageIds";
import { getChat } from "./(functions)/getChat";
import { getOtherUser } from "./(functions)/getOtherUser";

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
  if (!user) redirect("/account");
  const otherUser = await getOtherUser(supabase, params.user_id);
  if (!otherUser) return redirect(`/`);
  const chat = await getChat(user, otherUser);
  if (!chat) return redirect(`/`);
  const messageIds = await getMessageIds(chat);
  const fileIds = await getFileIds(supabase, messageIds);
  const searchFilesData = await getSearchFilesData(supabase, messageIds);

  return (
    <div className="bg-background flex flex-col h-[80vh] w-full">
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
        <div className="flex-grow overflow-hidden">
          <ChatMessages
            user={user}
            chat={chat ? chat : null}
            type="chat"
            name={
              isObject(otherUser) && otherUser.username
                ? otherUser.username
                : "undefined"
            }
            fileTab={true}
            messageIds={messageIds}
            fileIds={fileIds}
            searchData={searchFilesData ? searchFilesData : []}
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
