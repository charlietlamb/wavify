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
  colUser: Json;
  userData: User[];
}) {
  const spaces = getSpaces(collective);
  const { textSpaces, audioSpaces, videoSpaces } = Array.isArray(spaces)
    ? { textSpaces: [], audioSpaces: [], videoSpaces: [] }
    : spaces;
  console.log(textSpaces);
  return (
    <div className="flex flex-col w-full h-full text-primary bg-background_content">
      <CollectiveHeader
        collective={collective}
        colUser={colUser}
        userData={userData}
        user={user}
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
                      user={user}
                      collective={collective}
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
                      user={user}
                      collective={collective}
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
                      user={user}
                      collective={collective}
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
                {collective?.users.map(
                  (user1) =>
                    isObject(user1) && (
                      <CollectiveMember
                        key={typeof user1.id === "string" ? user1.id : ""}
                        user={user1}
                        collective={collective}
                      />
                    )
                )}
              </div>
            </div>
          )}
      </ScrollArea>
    </div>
  );
}
