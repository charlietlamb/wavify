import { Hash, Mic, Video } from "lucide-react";

export const iconMap = {
  ["text"]: <Hash className="w-4 h-4 mr-2" />,
  ["audio"]: <Mic className="w-4 h-4 mr-2" />,
  ["video"]: <Video className="w-4 h-4 mr-2" />,
};
export const iconMapSidebar = {
  ["text"]: (
    <Hash className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  ["audio"]: (
    <Mic className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  ["video"]: (
    <Video className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
};

export const spaceTypes: SpaceType[] = ["text", "audio", "video"];
export const spaceLabels = ['Text Spaces', 'Audio Spaces', 'Video Spaces']
