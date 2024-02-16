import {
  imageExtensions,
  musicExtensions,
  zipExtensions,
} from "@/components/chat/data/extensions";
import { AnimatedCheckIcon } from "@/components/icons/check";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import isObject from "@/lib/isObject";
import {
  FileArchive,
  FileIcon,
  FileImage,
  FileMusic,
  Trash2,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ActionTooltip } from "../ActionTooltip";

type DisplayFile = {
  file: File;
  id: string;
};

export default function UploadFilesPreview({
  displayFiles,
  setDisplayFiles,
  scrollRef,
  color,
}: {
  displayFiles: DisplayFile[];
  setDisplayFiles: Dispatch<SetStateAction<DisplayFile[]>>;
  scrollRef: React.RefObject<HTMLDivElement>;
  color?: string;
}) {
  const fileClasses = "flex-shrink-0 w-12 h-12 text-background_content";
  const onAction = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDisplayFiles(
      Array.isArray(displayFiles)
        ? displayFiles.filter((file) => file.id !== id)
        : []
    );
  };
  return (
    <ScrollArea
      className="mt-2 max-h-[40vh] overflow-y-auto max-w-full"
      ref={scrollRef}
    >
      {displayFiles.length > 0 &&
        displayFiles.map((file, index) => {
          const fileExt = file.file.name.split(".").pop();
          return (
            <Card
              key={index}
              className="flex items-center mt-2 transition-all bg-transparent border-2 rounded-lg hover:rounded-md hover:bg-white/5"
              style={{ borderColor: color ? color : "#FFF" }}
            >
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center p-4 space-x-3">
                  {isObject(file) &&
                  typeof fileExt === "string" &&
                  imageExtensions.includes(fileExt) ? (
                    <FileImage
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : "#FFFFFF" }}
                    />
                  ) : typeof fileExt === "string" &&
                    musicExtensions.includes(fileExt) ? (
                    <FileMusic
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : "#FFFFFF" }}
                    />
                  ) : typeof fileExt === "string" &&
                    zipExtensions.includes(fileExt) ? (
                    <FileArchive
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : "#FFFFFF" }}
                    />
                  ) : (
                    <FileIcon
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : "#FFFFFF" }}
                    />
                  )}{" "}
                  <div
                    className="font-medium"
                    style={{ color: color ? color : "#FFFFFF" }}
                  >
                    <div className="text-lg overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[15vw]">
                      {file.file.name}
                    </div>{" "}
                    <div className="text-zinc-500">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>{" "}
                  </div>
                </div>
                <div className="flex flex-row pr-4 gap-x-2">
                  <AnimatedCheckIcon
                    width={32}
                    height={32}
                    color="hsl(var(--primary))"
                  ></AnimatedCheckIcon>
                  <ActionTooltip label="Delete">
                    <Trash2
                      onClick={(e) => onAction(e, file.id)}
                      className="flex-shrink-0 w-8 h-8 cursor-pointer"
                      color={color ? color : "#FFFFFF"}
                    />
                  </ActionTooltip>
                </div>
              </div>
            </Card>
          );
        })}
    </ScrollArea>
  );
}
