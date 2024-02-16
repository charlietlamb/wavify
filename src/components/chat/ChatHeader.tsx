import { ChatVideoButton } from "./ChatVideoButton";
import { UserAvatar } from "../me/UserAvatar";
import { MobileToggle } from "../util/MobileToggle";
import isObject from "@/lib/isObject";
import { iconMap } from "../collective/space/data";

interface BaseChatHeaderProps {
  user: User;
  type: "space" | "conversation";
  imageUrl?: string;
  collective?: Collective;
  colUser?: ColUserAndData;
}

interface ChatHeaderPropsWithOtherUser extends BaseChatHeaderProps {
  otherUser: User;
  space?: never; // This ensures that 'space' cannot be provided when 'otherUser' is provided
}

interface ChatHeaderPropsWithSpace extends BaseChatHeaderProps {
  otherUser?: never; // This ensures that 'otherUser' cannot be provided when 'space' is provided
  space: Space;
}

type ChatHeaderProps = ChatHeaderPropsWithOtherUser | ChatHeaderPropsWithSpace;

export const ChatHeader = ({
  user,
  otherUser,
  type,
  imageUrl,
  space,
  collective,
  colUser,
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center h-12 px-3 py-3 font-semibold text-md ">
      <MobileToggle user={user} collective={collective} colUser={colUser} />
      {type === "space" && iconMap[space?.type as keyof typeof iconMap]}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="w-8 h-8 mr-2 md:h-8 md:w-8" />
      )}
      <p className="font-semibold text-black text-md dark:text-white">
        {space && !Array.isArray(space) && typeof space === "object" ? (
          <>{space.name}</>
        ) : isObject(otherUser) ? (
          otherUser.username
        ) : (
          "no name found"
        )}
      </p>
      <div className="flex items-center ml-auto">
        {type === "conversation" && <ChatVideoButton />}
      </div>
    </div>
  );
};
