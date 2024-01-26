import { Hash } from "lucide-react";

import { ChatVideoButton } from "./ChatVideoButton";
import { UserAvatar } from "../me/UserAvatar";
import { MobileToggle } from "../util/MobileToggle";

interface ChatHeaderProps {
  user: User;
  otherUser: User;
  type: "space" | "conversation";
  imageUrl?: string;
  space?: Json;
}

export const ChatHeader = ({
  user,
  otherUser,
  type,
  imageUrl,
  space,
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center h-12 px-3 py-3 font-semibold border-b-2 text-md border-neutral-200 dark:border-neutral-800">
      <MobileToggle user={user} />
      {type === "space" && (
        <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="w-8 h-8 mr-2 md:h-8 md:w-8" />
      )}
      <p className="font-semibold text-black text-md dark:text-white">
        {space && !Array.isArray(space) && typeof space === "object" ? (
          <>space.name</>
        ) : (
          otherUser.username
        )}
      </p>
      <div className="flex items-center ml-auto">
        {type === "conversation" && <ChatVideoButton />}
      </div>
    </div>
  );
};
