"use client";
import {
  Edit,
  FileArchive,
  FileIcon,
  FileImage,
  FileMusic,
  ShieldAlert,
  ShieldCheck,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../../me/UserAvatar";
import { useModal } from "../../../../hooks/use-modal-store";
import { ActionTooltip } from "../../util/ActionTooltip";
import isObject from "@/lib/isObject";
import { formatDistanceToNow } from "date-fns";
import ResizableDiv from "../../me/ResizableDiv";
import downloadChatImage from "../actions/downloadFile";
interface ChatItemProps {
  chat: Chat;
  user: User;
  message: MessageAndAuthor | null;
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
  if (!message) return null;
  const { onOpen } = useModal();
  const router = useRouter();
  const onMemberClick = () => {
    if (user.id === message.author) {
      return;
    }
    router.push(`/user/${user.username}/chat`);
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

  const getFileExtension = (url: string | undefined): string => {
    if (typeof url === "string") {
      const parts = url.split(".");
      return parts.length > 0 ? parts.pop()?.toLowerCase() || "" : "";
    }
    return "";
  };
  var canDeleteAny = false;
  if (collective && isObject(role) && role.canMessages) {
    canDeleteAny = true;
  }
  const isSender = user.id === message.author;
  if (!collective && isSender) {
    canDeleteAny = true;
  }

  const fileClasses = "w-10 h-10 fill-transparent stroke-primary min-w-10";
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const musicExtensions = [
    "mp3",
    "wav",
    "ogg",
    "flac",
    "aac",
    "wma",
    "mid",
    "midi",
  ];
  const zipExtensions = [
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",
    "xz",
    "bz2",
    "lzma",
    "z",
  ];
  async function download(fileUrl: string, fileName: string) {
    const url = await downloadChatImage(fileUrl);
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  }
  return (
    <ResizableDiv
      className={cn(
        "relative flex items-center p-4 transition group rounded-lg bg-background_content cursor-auto",
        isSender && "ml-auto bg-zinc-950"
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
                className="text-sm font-semibold text-white cursor-pointer hover:underline"
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
          {message.deleted && Array.isArray(message.files) ? (
            <p className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-400">
              files deleted
            </p>
          ) : Array.isArray(message.files) ? (
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-y-1">
                {message.files.map((file: Json) => {
                  if (file && isObject(file)) {
                    const fileExtension = getFileExtension(
                      typeof file.fileUrl === "string" ? file.fileUrl : ""
                    );
                    const isImage = imageExtensions.includes(fileExtension);
                    return (
                      <div
                        key={typeof file.fileId === "string" ? file.fileId : ""}
                        className=""
                      >
                        {isImage ? (
                          <button
                            onClick={() => {
                              download(
                                typeof file.fileUrl === "string"
                                  ? file.fileUrl
                                  : "",
                                typeof file.fileName === "string"
                                  ? file.fileName
                                  : ""
                              );
                            }}
                            className="relative flex items-center justify-start w-48 h-48 mt-2 overflow-hidden border rounded-md aspect-square bg-secondary"
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
                          </button>
                        ) : (
                          <div
                            className={cn(
                              "relative flex items-center p-2 mt-2 rounded-md",
                              isSender && "w-full"
                            )}
                          >
                            {isObject(file) &&
                            typeof file.fileExt === "string" &&
                            imageExtensions.includes(file.fileExt) ? (
                              <FileImage
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : typeof file.fileExt === "string" &&
                              musicExtensions.includes(file.fileExt) ? (
                              <FileMusic
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : typeof file.fileExt === "string" &&
                              zipExtensions.includes(file.fileExt) ? (
                              <FileArchive
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : (
                              <FileIcon
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            )}
                            <button
                              onClick={() => {
                                download(
                                  typeof file.fileUrl === "string"
                                    ? file.fileUrl
                                    : "",
                                  typeof file.fileName === "string"
                                    ? file.fileName
                                    : ""
                                );
                              }}
                              className={cn(
                                "ml-2 text-sm text-primary dark:text-primary hover:underline text-left"
                              )}
                            >
                              {typeof file.fileName === "string"
                                ? file.fileName
                                : "Unnamed File"}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {canDeleteAny && (
                <Trash
                  onClick={() =>
                    onOpen("deleteMessage", {
                      message: message,
                    })
                  }
                  className="h-auto transition cursor-pointer min-w-5 max-w-5 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                />
              )}
            </div>
          ) : (
            <div
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300 flex justify-between items-end",
                message.deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {message.deleted ? (
                "message deleted"
              ) : typeof message.content === "string" ? (
                <>
                  <div className="flex-grow">{message.content}</div>
                  {canDeleteAny && (
                    <Trash
                      onClick={() =>
                        onOpen("deleteMessage", {
                          message: message,
                        })
                      }
                      className="h-auto transition cursor-pointer min-w-5 max-w-5 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                    />
                  )}
                </>
              ) : (
                ""
              )}
              {message.edited && !message.deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </ResizableDiv>
  );
}
