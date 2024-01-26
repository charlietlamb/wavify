import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getUser from "@/app/actions/getUser";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";

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
  const { data: collective } = (await supabase
    .from("collectives")
    .select()
    .eq("unique", params.unique)
    .single()) as { data: Json };
  var hasSpace = false;
  if (
    collective &&
    !Array.isArray(collective) &&
    typeof collective === "object" &&
    Array.isArray(collective.spaces)
  ) {
    hasSpace = collective.spaces.some(
      (space: Json) =>
        space &&
        !Array.isArray(space) &&
        typeof space === "object" &&
        space.slug === params.space_slug
    );
  }
  if (!hasSpace) {
    console.log("no space found!");
    redirect(`/collective/${params.unique}`);
  }
  const space =
    collective &&
    !Array.isArray(collective) &&
    typeof collective === "object" &&
    Array.isArray(collective.spaces)
      ? collective.spaces.find(
          (space: Json) =>
            space &&
            !Array.isArray(space) &&
            typeof space === "object" &&
            space.slug === params.space_slug
        )
      : null;
  function isObject(space: any): space is Record<string, unknown> {
    return typeof space === "object" && space !== null && !Array.isArray(space);
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={isObject(space) ? space.name : ""}
        collectiveId={isObject(space) ? space.collectiveId : ""}
        type="space"
      />
      {isObject(space) && space.type === "text" && (
        <>
          <ChatMessages
            user={user}
            name={isObject(space) ? space.name : ""}
            chatId={isObject(space) ? space.id : ""}
            type="space"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              spaceId: isObject(space) ? space.id : "",
              collectiveId: isObject(collective) ? collective.id : "",
            }}
            paramKey="spaceId"
            paramValue={isObject(space) ? space.id : ""}
          />
          <ChatInput
            name={isObject(space) ? space.name : ""}
            type="space"
            apiUrl="/api/socket/messages"
            query={{
              spaceId: isObject(space) ? space.id : "",
              collectiveId: isObject(collective) ? collective.id : "",
            }}
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
