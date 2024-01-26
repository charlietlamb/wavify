import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { CollectiveHeader } from "./CollectiveHeader";
import CollectiveSearch from "./CollectiveSearch";
import CollectiveSection from "./CollectiveSection";
import { CollectiveSpace } from "./CollectiveSpace";
import { CollectiveMember } from "./CollectiveMember";
import { v4 as uuidv4 } from "uuid";

type SpaceTypes = "text" | "audio" | "video"; // Add more space types as needed
type Space = {
  id: string;
  allowedRoles: string[];
  type: SpaceTypes;
};

const iconMap = {
  ["text"]: <Hash className="w-4 h-4 mr-2" />,
  ["audio"]: <Mic className="w-4 h-4 mr-2" />,
  ["video"]: <Video className="w-4 h-4 mr-2" />,
};

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
  var hasSpaces = false;
  var textSpaces: Json[] | Json | null = [];
  var audioSpaces: Json[] | Json | null = [];
  var videoSpaces: Json[] | Json | null = [];
  if (Array.isArray(collective.spaces)) {
    hasSpaces = true;
    textSpaces = collective.spaces.filter(
      (space) =>
        space != null &&
        typeof space === "object" &&
        !Array.isArray(space) &&
        space.type === "text"
    );
    audioSpaces = collective.spaces.filter(
      (space) =>
        space != null &&
        typeof space === "object" &&
        !Array.isArray(space) &&
        space.type === "audio"
    );
    videoSpaces = collective.spaces.filter(
      (space) =>
        space != null &&
        typeof space === "object" &&
        !Array.isArray(space) &&
        space.type === "video"
    );
  }
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
            data={[
              {
                key: uuidv4(),
                label: "Text Spaces",
                type: "space",
                data: textSpaces
                  ?.map((space) =>
                    space
                      ? {
                          id:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space)
                              ? space.slug
                              : null,
                          name:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space)
                              ? space.name
                              : null,
                          icon:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space) &&
                            typeof space.type === "string"
                              ? iconMap[space.type as keyof typeof iconMap]
                              : null,
                        }
                      : null
                  )
                  .filter(Boolean) as {
                  icon: React.ReactNode;
                  name: string;
                  id: string;
                }[],
              },
              {
                key: uuidv4(),
                label: "Voice Spaces",
                type: "space",
                data: audioSpaces
                  ?.map((space) =>
                    space
                      ? {
                          id:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space)
                              ? space.slug
                              : null,
                          name:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space)
                              ? space.name
                              : null,
                          icon:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space) &&
                            typeof space.type === "string"
                              ? iconMap[space.type as keyof typeof iconMap]
                              : null,
                        }
                      : null
                  )
                  .filter(Boolean) as {
                  icon: React.ReactNode;
                  name: string;
                  id: string;
                }[],
              },
              {
                key: uuidv4(),
                label: "Video Spaces",
                type: "space",
                data: videoSpaces
                  ?.map((space) =>
                    space
                      ? {
                          id:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space)
                              ? space.slug
                              : null,
                          name:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space)
                              ? space.name
                              : null,
                          icon:
                            space &&
                            typeof space === "object" &&
                            !Array.isArray(space) &&
                            typeof space.type === "string"
                              ? iconMap[space.type as keyof typeof iconMap]
                              : null,
                        }
                      : null
                  )
                  .filter(Boolean) as {
                  icon: React.ReactNode;
                  name: string;
                  id: string;
                }[],
              },
              {
                key: uuidv4(),
                label: "Users",
                type: "user",
                data: Array.isArray(collective.users)
                  ? (collective.users
                      ?.map(
                        (colUser: Json) =>
                          colUser && {
                            id:
                              typeof colUser === "object" &&
                              !Array.isArray(colUser) &&
                              colUser.unique,
                            name:
                              typeof colUser === "object" &&
                              !Array.isArray(colUser) &&
                              colUser.username,
                            icon:
                              typeof colUser === "object" &&
                              !Array.isArray(colUser) &&
                              colUser.role === "string" &&
                              roleIconMap[colUser.role as keyof typeof iconMap],
                          }
                      )
                      .filter(Boolean) as
                      | {
                          icon: React.ReactNode;
                          name: string;
                          id: string;
                        }[])
                  : [],
              },
            ]}
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
                  space != null &&
                  typeof space === "object" &&
                  !Array.isArray(space) && (
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
                  space != null &&
                  typeof space === "object" &&
                  !Array.isArray(space) && (
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
                  space != null &&
                  typeof space === "object" &&
                  !Array.isArray(space) && (
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
                    user1 != null &&
                    typeof user1 === "object" &&
                    !Array.isArray(user1) && (
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
