import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getUser from "@/app/actions/getUser";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import isObject from "@/lib/isObject";
import { getSearchFilesData } from "@/app/user/[user_id]/chat/(functions)/getSearchFilesData";
import { getSpace } from "./(functions)/getSpace";
import { getChatSpace } from "./(functions)/getChatSpace";
import { getCollective } from "./(functions)/getCollective";
import { getColUserDataFromUserAndCol } from "@/components/collective/(sidebar)/(functions)/getColUserDataFromUserAndCol";
import { MediaRoom } from "@/components/media/MediaRoom";

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
  if (!collective) redirect(`/`);
  const space = await getSpace(collective, params.space_slug, supabase);
  if (!space || Array.isArray(space)) redirect(`/collective/${params.unique}`);
  let chat: Chat | null = null;
  let searchFilesData;
  if (space.type === "text") {
    chat = await getChatSpace(collective, space);
    if (!chat) return redirect(`/`);
    searchFilesData = await getSearchFilesData(supabase);
  }
  const colUser = await getColUserDataFromUserAndCol(
    supabase,
    user,
    collective
  );
  if (!colUser) return redirect(`/`);
  if (!space.allowed.includes(colUser.roles?.id))
    return redirect(`/collective/${params.unique}`);

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-background_content">
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
            type={"space"}
            fileTab={true}
            searchData={searchFilesData}
            colUser={colUser}
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
      {isObject(space) &&
        (space.type === "audio" || space.type === "video") && (
          <MediaRoom
            chatId={isObject(space) ? space.id : ""}
            video={space.type === "video"}
            audio={true}
            user={user}
          />
        )}
    </div>
  );
}
