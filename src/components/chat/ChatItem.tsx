"use client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../me/UserAvatar";
import { useModal } from "../../../hooks/use-modal-store";
import { ActionTooltip } from "../util/ActionTooltip";
import isObject from "@/lib/isObject";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatDistanceToNow } from "date-fns";
interface ChatItemProps {
  chat: Chat;
  user: User;
  message: MessageAndAuthor;
  colUser?: Json;
  space?: Json;
  collective?: Json;
}

interface RoleIconMap {
  [key: string]: JSX.Element;
}

const roleIconMap: RoleIconMap = {
  other: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
  founder: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};

export function ChatItem({
  chat,
  user,
  message,
  colUser,
  space,
  collective,
}: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const onMemberClick = () => {
    if (user.id === message.author) {
      return;
    }
    router.push(`/users/${user.username}/chat`);
  };
  var role = null;
  if (
    isObject(collective) &&
    colUser &&
    space &&
    Array.isArray(collective.roles)
  ) {
    role = collective.roles.find(
      (role1: Json) =>
        role1 &&
        typeof role1 === "object" &&
        !Array.isArray(role1) &&
        colUser &&
        typeof colUser === "object" &&
        !Array.isArray(colUser) &&
        role1.id === colUser.roleId
    );
  }
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

  const getFileExtension = (url: string | undefined): string => {
    if (typeof url === "string") {
      const parts = url.split(".");
      return parts.length > 0 ? parts.pop()?.toLowerCase() || "" : "";
    }
    return "";
  };
  const isSender = user.id === message.author;
  return (
    <div
      className={cn(
        "relative flex items-center w-[90%] p-4 transition group rounded-lg bg-background_content hover:bg-primary/5 cursor-auto",
        isSender && "ml-auto bg-primary/5 hover:bg-background_content"
      )}
    >
      <div className={cn("flex items-start w-full group gap-x-2")}>
        <div
          onClick={onMemberClick}
          className="transition cursor-pointer hover:drop-shadow-md"
        >
          <UserAvatar src={"https://github.com/shadcn.png"} />
        </div>
        <div className="flex flex-col w-full">
          <div className={cn("flex items-center gap-x-2")}>
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="text-sm font-semibold cursor-pointer hover:underline"
              >
                {isObject(message.users) ? message.users.username : null}
              </p>
              {isObject(role) && (
                <ActionTooltip
                  label={typeof role.name === "string" ? role.name : ""}
                >
                  {
                    roleIconMap[
                      typeof role.iconKey === "string" ? role.iconKey : ""
                    ]
                  }
                </ActionTooltip>
              )}
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {typeof message.createdAt === "string"
                ? formatDistanceToNow(new Date(message.createdAt)) + " ago"
                : ""}
            </span>
          </div>
          {Array.isArray(message.files) ? (
            <div>
              {message.files.map((file: Json) => {
                if (file && isObject(file)) {
                  const fileExtension = getFileExtension(
                    typeof file.fileUrl === "string" ? file.fileUrl : ""
                  );
                  const isImage = imageExtensions.includes(fileExtension);

                  return (
                    <div
                      key={typeof file.fileId === "string" ? file.fileId : ""}
                    >
                      {isImage ? (
                        <Link
                          href={
                            typeof file.fileUrl === "string" ? file.fileUrl : ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative flex items-center w-48 h-48 mt-2 overflow-hidden border rounded-md aspect-square bg-secondary"
                        >
                          <Image
                            src={
                              typeof "https://github.com/shadcn.png" ===
                              "string"
                                ? "https://github.com/shadcn.png"
                                : ""
                            }
                            alt={
                              typeof file.fileName === "string"
                                ? file.fileName
                                : ""
                            }
                            fill
                            className="object-cover"
                          />
                        </Link>
                      ) : (
                        <div
                          className={cn(
                            "relative flex items-center p-2 mt-2 rounded-md bg-background/10",
                            isSender && "w-full"
                          )}
                        >
                          <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
                          <Link
                            href={
                              typeof file.fileUrl === "string"
                                ? file.fileUrl
                                : "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                            )}
                          >
                            {typeof file.fileName === "string"
                              ? file.fileName
                              : "Unnamed File"}
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                message.deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {message.deleted ? (
                "message deleted"
              ) : typeof message.content === "string" ? (
                <>
                  {message.content}
                  <Trash
                    onClick={() =>
                      onOpen("deleteMessage", {
                        message: message,
                      })
                    }
                    className="w-4 h-4 ml-auto transition cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                  />
                </>
              ) : (
                ""
              )}
              {message.edited && !message.deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
