import { Hash, Mic, Video } from "lucide-react";

const iconMap = {
  ["text"]: <Hash className="w-4 h-4 mr-2" />,
  ["audio"]: <Mic className="w-4 h-4 mr-2" />,
  ["video"]: <Video className="w-4 h-4 mr-2" />,
};

export function getUserData(
  collective: Collective,
  roleIconMap: { [key: string]: React.ReactNode }
) {
  return Array.isArray(collective.users)
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
    : [];
}
