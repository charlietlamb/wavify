import { v4 as uuidv4 } from "uuid";
import { getSpaceData } from "./getSpaceData";
import { Hash, Mic, Video } from "lucide-react";
import { getUserData } from "./getUserData";
const iconMap = {
  ["text"]: <Hash className="w-4 h-4 mr-2" />,
  ["audio"]: <Mic className="w-4 h-4 mr-2" />,
  ["video"]: <Video className="w-4 h-4 mr-2" />,
};

export function getData(
  textSpaces: Json[],
  audioSpaces: Json[],
  videoSpaces: Json[],
  collective: Collective,
  roleIconMap: { [key: string]: React.ReactNode }
) {
  return [
    {
      key: uuidv4(),
      label: "Text Spaces",
      type: "space" as const,
      data: getSpaceData(textSpaces, iconMap),
    },
    {
      key: uuidv4(),
      label: "Voice Spaces",
      type: "space" as const,
      data: getSpaceData(audioSpaces, iconMap),
    },
    {
      key: uuidv4(),
      label: "Video Spaces",
      type: "space" as const,
      data: getSpaceData(videoSpaces, iconMap),
    },
    {
      key: uuidv4(),
      label: "Users",
      type: "user" as const,
      data: getUserData(collective, roleIconMap),
    },
  ];
}
