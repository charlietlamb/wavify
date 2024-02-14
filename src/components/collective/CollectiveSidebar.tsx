import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { CollectiveHeader } from "./CollectiveHeader";
import CollectiveSection from "./CollectiveSection";
import { CollectiveSpace } from "./CollectiveSpace";
import { getSpaces } from "./(sidebar)/(functions)/getSpaces";
import isObject from "@/lib/isObject";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getUserRole } from "./(sidebar)/(functions)/getUserRole";
import CollectiveMemberMap from "./CollectiveMemberMap";
import CollectiveSearchWrap from "./CollectiveSearchWrap";

export default async function CollectiveSidebar({
  unique,
  user,
  collective,
  colUser,
  colUsers,
  roles,
  colSpaces,
}: {
  unique?: string;
  user: User;
  collective: Collective;
  colUser: ColUserAndData;
  colUsers: ColUserAndData[];
  roles: Role[];
  colSpaces: Space[];
}) {
  const supabase = createServerComponentClient({ cookies });
  const userRole = await getUserRole(colUser, supabase);
  const spaces = await getSpaces(collective, supabase);
  const { textSpaces, audioSpaces, videoSpaces } = spaces
    ? spaces
    : { textSpaces: [], audioSpaces: [], videoSpaces: [] };
  const isFounder = user.id === collective.founder;

  const spacesToPass: Space[] = spaces
    ? isFounder
      ? [...textSpaces, ...audioSpaces, ...videoSpaces]
      : [
          ...textSpaces.filter((space: Space) =>
            space.allowed.includes(colUser.roles?.id)
          ),
          ...audioSpaces.filter((space: Space) =>
            space.allowed.includes(colUser.roles?.id)
          ),
          ...videoSpaces.filter((space: Space) =>
            space.allowed.includes(colUser.roles?.id)
          ),
        ]
    : [];
  const filteredTextSpaces = isFounder
    ? textSpaces
    : textSpaces.filter((space: Space) =>
        space.allowed.includes(colUser.roles?.id)
      );
  const filteredAudioSpaces = isFounder
    ? audioSpaces
    : audioSpaces.filter((space: Space) =>
        space.allowed.includes(colUser.roles?.id)
      );
  const filteredVideoSpaces = isFounder
    ? videoSpaces
    : videoSpaces.filter((space: Space) =>
        space.allowed.includes(colUser.roles?.id)
      );
  return (
    <div className="flex flex-col w-full h-full text-primary bg-background_content">
      <CollectiveHeader
        collective={collective}
        colUser={colUser}
        user={user}
        userRole={userRole}
        colUsers={colUsers}
        roles={roles}
        spaces={colSpaces}
      />
      <ScrollArea className="flex-1 px-3">
        <CollectiveSearchWrap
          collective={collective}
          spaces={spaces}
          colUsers={colUsers}
        ></CollectiveSearchWrap>
        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
        {!!filteredTextSpaces?.length && (
          <div className="mb-2">
            <CollectiveSection
              sectionType="spaces"
              spaceType="text"
              user={user}
              collective={collective}
              label="Text Spaces"
              colUser={colUser}
              colUsers={colUsers}
              roles={roles}
            />
            <div className="space-y-[2px]">
              {filteredTextSpaces.map((space) => (
                <CollectiveSpace
                  key={space.id}
                  space={space}
                  collective={collective}
                  userRole={userRole}
                  spaces={spacesToPass}
                  roles={roles}
                />
              ))}
            </div>
          </div>
        )}
        {!!filteredAudioSpaces?.length && (
          <div className="mb-2">
            <CollectiveSection
              sectionType="spaces"
              spaceType="audio"
              user={user}
              collective={collective}
              label="Audio Spaces"
              colUser={colUser}
              colUsers={colUsers}
              roles={roles}
            />
            <div className="space-y-[2px]">
              {filteredAudioSpaces.map(
                (space) =>
                  isObject(space) && (
                    <CollectiveSpace
                      key={typeof space.id === "string" ? space.id : ""}
                      space={space}
                      userRole={userRole}
                      collective={collective}
                      spaces={spacesToPass}
                      roles={roles}
                    />
                  )
              )}
            </div>
          </div>
        )}
        {!!filteredVideoSpaces?.length && (
          <div className="mb-2">
            <CollectiveSection
              sectionType="spaces"
              spaceType="video"
              user={user}
              collective={collective}
              label="Video Spaces"
              colUser={colUser}
              colUsers={colUsers}
              roles={roles}
            />
            <div className="space-y-[2px]">
              {filteredVideoSpaces.map(
                (space) =>
                  isObject(space) && (
                    <CollectiveSpace
                      key={typeof space.id === "string" ? space.id : ""}
                      space={space}
                      userRole={userRole}
                      collective={collective}
                      spaces={spacesToPass}
                      roles={roles}
                    />
                  )
              )}
            </div>
          </div>
        )}

        <CollectiveMemberMap
          user={user}
          collective={collective}
          initColUsers={colUsers}
          roles={roles}
        ></CollectiveMemberMap>
      </ScrollArea>
    </div>
  );
}
