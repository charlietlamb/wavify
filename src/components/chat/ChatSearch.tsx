"use client";

import { ArrowBigUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import downloadChatImage from "./actions/downloadFile";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import isObject from "@/lib/isObject";
import Image from "next/image";
import { UserAvatar } from "../me/UserAvatar";
import { cn } from "@/lib/utils";

interface ChatSearchProps {
  searchData: (MessageAndAuthor | null)[];
  className: string;
}

interface FileData {
  fileId: string;
  fileName: string;
  fileExt: string;
  fileUrl: string;
  fileSize: number;
  username: string;
  profile_pic_url: string;
}

export default function ChatSearch({ searchData, className }: ChatSearchProps) {
  const [open, setOpen] = useState(false);
  const filesData = searchData.reduce((acc: FileData[], item) => {
    if (item && typeof item === "object" && Array.isArray(item.files)) {
      const filesWithAttributes = item.files
        .map(
          (file) =>
            isObject(file) && {
              ...file,
              username: item.users.username,
              profile_pic_url: item.users.profile_pic_url,
            }
        )
        .filter(Boolean) as FileData[];
      return [...acc, ...filesWithAttributes];
    } else {
      return acc;
    }
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = async ({
    fileUrl,
    fileName,
  }: {
    fileUrl: string;
    fileName: string;
  }) => {
    setOpen(false);
    const url = await downloadChatImage(fileUrl);
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center w-full px-2 py-2 transition rounded-md group gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
          className
        )}
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold transition text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <div className="flex">
            <span className="text-xs">⌘</span>
            <ArrowBigUp strokeWidth={1.5} className="w-auto h-3 mt-[1px]" />
          </div>
          F
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all files" />
        <CommandList className="bg-zinc-950">
          <CommandEmpty>No Files Found.</CommandEmpty>
          {filesData.map(({ fileId, fileName, profile_pic_url, fileUrl }) => {
            return (
              <CommandItem
                key={fileId}
                onSelect={() => onClick({ fileUrl, fileName })}
                className="cursor-pointer m1 hover:bg-background_content"
              >
                <UserAvatar
                  src="https://github.com/shadcn.png"
                  className="mr-2"
                ></UserAvatar>
                <span>{fileName}</span>
                <span className="hidden">{fileId}</span>
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
