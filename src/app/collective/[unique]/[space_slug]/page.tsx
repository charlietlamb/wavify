import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getUser from "@/app/actions/getUser";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import isObject from "@/lib/isObject";
import { getMessageIds } from "@/app/user/[user_id]/chat/(functions)/getMessageIds";
import { getFileIds } from "@/app/user/[user_id]/chat/(functions)/getFileIds";
import { getSearchFilesData } from "@/app/user/[user_id]/chat/(functions)/getSearchFilesData";
import { getSpace } from "./(functions)/getSpace";
import { getChatSpace } from "./(functions)/getChatSpace";
import { getCollective } from "./(functions)/getCollective";
import { getHasSpace } from "./(functions)/getHasSpace";

interface spacePageParams {
  unique: string;
  space_slug: string;
}

interface spacePageProps {
  params: spacePageParams;
}

export default async function page({ params }: spacePageProps) {
  const supabase = createServerComponentClient({ cookies });
  const user = await getUser();
  if (!user) redirect("/account");
  const collective = await getCollective(supabase, params.unique);
  var hasSpace = getHasSpace(collective, params.space_slug);
  if (!hasSpace) redirect(`/collective/${params.unique}`);
  const space = getSpace(collective, params.space_slug);
  if (!isObject(space) || !isObject(collective))
    redirect(`/collective/${params.unique}`);
  var chat: Chat | null = null;
  var messageIds;
  var fileIds;
  var searchFilesData;
  if (space.type === "text") {
    chat = await getChatSpace(collective);
    if (!chat) return redirect(`/`);
    messageIds = await getMessageIds(chat);
    fileIds = await getFileIds(supabase, messageIds);
    searchFilesData = await getSearchFilesData(supabase, messageIds);
  }
  if (!chat) return redirect(`/`);

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        user={user}
        type={"space"}
        imageUrl={
          isObject(collective) && typeof collective.image_url === "string"
            ? collective.image_url
            : ""
        }
        space={space}
      />
      {isObject(space) && space.type === "text" && (
        <>
          <ChatMessages
            name={
              isObject(space) && typeof space.name === "string"
                ? space.name
                : ""
            }
            user={user}
            chat={chat}
            space={space}
            type={"space"}
            collective={collective}
            fileTab={true}
            messageIds={messageIds ? messageIds : []}
            fileIds={fileIds ? fileIds : []}
            searchData={searchFilesData}
          />
          <ChatInput
            chat={chat}
            type="space"
            user={user}
            name={
              isObject(space) && typeof space.name === "string"
                ? space.name
                : ""
            }
          />
        </>
      )}
      {/*isObject(space) && space.type === "audio" && (
        <MediaRoom
          chatId={isObject(space) ? space.id : ""}
          video={false}
          audio={true}
        />
      )}
      {isObject(space) && space.type === "video" && (
        <MediaRoom
          chatId={isObject(space) ? space.id : ""}
          video={true}
          audio={true}
        />
      )*/}
    </div>
  );
}
