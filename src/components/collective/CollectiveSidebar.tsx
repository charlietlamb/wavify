import { ShieldAlert, ShieldCheck } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { CollectiveHeader } from "./CollectiveHeader";
import CollectiveSearch from "./CollectiveSearch";
import CollectiveSection from "./CollectiveSection";
import { CollectiveSpace } from "./CollectiveSpace";
import { CollectiveMember } from "./CollectiveMember";
import { getSpaces } from "./(sidebar)/(functions)/getSpaces";
import { getData } from "./(sidebar)/(functions)/getData";
import isObject from "@/lib/isObject";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getUserRole } from "./(sidebar)/(functions)/getUserRole";
import { getUserRoleFromId } from "./member/getUserRoleFromId";
interface RoleIconMap {
  [key: string]: JSX.Element;
}

const roleIconMap: RoleIconMap = {
  other: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
  founder: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};

//order collective users and spaces based on importance? also need imports for mobile
export default async function CollectiveSidebar({
  unique,
  user,
  collective,
  colUser,
  userData,
}: {
  unique?: string;
  user: User;
  collective: Collective;
  colUser: ColUser;
  userData: User[];
}) {
  const supabase = createServerComponentClient({ cookies });
  const userRole = await getUserRole(colUser, supabase);
  const spaces = await getSpaces(collective, supabase);
  const { textSpaces, audioSpaces, videoSpaces } = spaces
    ? spaces
    : { textSpaces: [], audioSpaces: [], videoSpaces: [] };
  const spacesToPass: Space[] = spaces
    ? [...textSpaces, ...audioSpaces, ...videoSpaces]
    : [];
  return (
    <div className="flex flex-col w-full h-full text-primary bg-background_content">
      <CollectiveHeader
        collective={collective}
        colUser={colUser}
        userData={userData}
        user={user}
        userRole={userRole}
      />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <CollectiveSearch
            data={getData(
              textSpaces,
              audioSpaces,
              videoSpaces,
              collective,
              roleIconMap
            )}
          />
        </div>
        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
        {!!textSpaces?.length && (
          <div className="mb-2">
            <CollectiveSection
              sectionType="spaces"
              spaceType="text"
              user={user}
              collective={collective}
              label="Text Spaces"
            />
            <div className="space-y-[2px]">
              {textSpaces.map(
                (space) =>
                  isObject(space) && (
                    <CollectiveSpace
                      key={typeof space.id === "string" ? space.id : ""}
                      space={space}
                      collective={collective}
                      userRole={userRole}
                      spaces={spacesToPass}
                    />
                  )
              )}
            </div>
          </div>
        )}
        {!!audioSpaces?.length && (
          <div className="mb-2">
            <CollectiveSection
              sectionType="spaces"
              spaceType="audio"
              user={user}
              collective={collective}
              label="Audio Spaces"
            />
            <div className="space-y-[2px]">
              {audioSpaces.map(
                (space) =>
                  isObject(space) && (
                    <CollectiveSpace
                      key={typeof space.id === "string" ? space.id : ""}
                      space={space}
                      userRole={userRole}
                      collective={collective}
                      spaces={spacesToPass}
                    />
                  )
              )}
            </div>
          </div>
        )}
        {!!videoSpaces?.length && (
          <div className="mb-2">
            <CollectiveSection
              sectionType="spaces"
              spaceType="video"
              user={user}
              collective={collective}
              label="Video Spaces"
            />
            <div className="space-y-[2px]">
              {videoSpaces.map(
                (space) =>
                  isObject(space) && (
                    <CollectiveSpace
                      key={typeof space.id === "string" ? space.id : ""}
                      space={space}
                      userRole={userRole}
                      collective={collective}
                      spaces={spacesToPass}
                    />
                  )
              )}
            </div>
          </div>
        )}
        {collective &&
          Array.isArray(collective.users) &&
          !!collective.users?.length && (
            <div className="mb-2">
              <CollectiveSection
                sectionType="users"
                user={user}
                label="Members"
                collective={collective}
              />
              <div className="space-y-[2px]">
                {collective?.users.map(async (user1) => {
                  const colUser = await getUserRoleFromId(
                    typeof user1 === "string" ? user1 : "",
                    collective,
                    supabase
                  );
                  return (
                    <CollectiveMember
                      key={typeof user1 === "string" ? user1 : ""}
                      colUserAndData={colUser}
                    />
                  );
                })}
              </div>
            </div>
          )}
      </ScrollArea>
    </div>
  );
}
