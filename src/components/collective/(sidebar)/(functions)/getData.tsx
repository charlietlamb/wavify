import { v4 as uuidv4 } from "uuid";
import { getSpaceData } from "./getSpaceData";
import { getUserData } from "./getUserData";
import { iconMap } from "../../space/data";

export function getData(
  textSpaces: Space[],
  audioSpaces: Space[],
  videoSpaces: Space[],
  colUsers: ColUserAndData[]
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
      data: getUserData(colUsers),
    },
  ];
}
