import { FileIcon, UploadCloud, FileBarChart2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
interface dropZoneProps {
  uploadFunction?: (imageFile: File | File[]) => void;
  imageUrl?: string;
  maxUpload?: number; //in MB
  multipleFiles?: boolean;
  displayText?: string;
  fileAccept?: string;
}
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { AnimatedCheckIcon } from "../icons/check";
import { ScrollArea } from "../ui/scroll-area";
import { ActionTooltip } from "./ActionTooltip";

type DisplayFile = {
  file: File;
  id: string;
};
const UploadDropZone = ({
  uploadFunction,
  imageUrl,
  maxUpload,
  multipleFiles,
  displayText,
  fileAccept,
}: dropZoneProps) => {
  const [uploaded, setUploaded] = imageUrl ? useState(true) : useState(false);
  const [imageSrc, setImageSrc] = imageUrl ? useState(imageUrl) : useState("");
  const [displayFiles, setDisplayFiles] = useState<DisplayFile[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const onAction = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDisplayFiles(
      Array.isArray(displayFiles)
        ? displayFiles.filter((file) => file.id !== id)
        : []
    );
  };

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    var maxSize = maxUpload ? maxUpload : 5;
    const acceptedImageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    if (e.target.files) {
      if (!multipleFiles) {
        var file = e.target.files[0];
        if (file.size > maxSize * 1024 * 1024) {
          setErrorMessage(`File size exceeds ${maxSize}MB`);
          return;
        }
        setErrorMessage("");
        var extension =
          file && file.name && file.name.split(".")
            ? file.name.split(".").pop()
            : "";
        if (acceptedImageTypes.includes(extension ? extension : "")) {
          setImageSrc(URL.createObjectURL(file));
        }
        setUploaded(true);
        if (uploadFunction) {
          uploadFunction(file);
        }
      } else {
        var files = e.target.files;
        if (files instanceof FileList) {
          var newFiles = [...files];
          newFiles.forEach((file) => {
            if (file.size > maxSize * 1024 * 1024) {
              setErrorMessage(`File size exceeds ${maxSize}MB`);
              return;
            }
          });
          setErrorMessage("");
          newFiles.forEach((file) => {
            var extension =
              file && file.name && file.name.split(".")
                ? file.name.split(".").pop()
                : "";
            if (acceptedImageTypes.includes(extension ? extension : "")) {
              setImageSrc(URL.createObjectURL(file));
            }
          });
          setDisplayFiles([
            ...displayFiles,
            ...newFiles.map((file) => ({ file, id: uuidv4() })),
          ]);
          if (uploadFunction) {
            uploadFunction(newFiles);
          }
        } else {
          var file = e.target.files[0];
          if (file.size > maxSize * 1024 * 1024) {
            setErrorMessage(`File size exceeds ${maxSize}MB`);
            return;
          }
          setErrorMessage("");
          var extension =
            file && file.name && file.name.split(".")
              ? file.name.split(".").pop()
              : "";
          if (acceptedImageTypes.includes(extension ? extension : "")) {
            setImageSrc(URL.createObjectURL(file));
          }
          setDisplayFiles([...displayFiles, { file, id: uuidv4() }]);
          if (uploadFunction) {
            uploadFunction(file);
          }
        }
      }
    }
  }
  function changeImage() {
    setUploaded(false);
  }
  return (
    <div className=" h-auto w-[100%] flex items-center justify-center">
      {!uploaded ? (
        <div className="flex z-1 min-h-[100%] w-full flex-col gap-y-2">
          <div className="relative flex flex-col items-center justify-center w-full text-white border-4 border-dashed border-background_content rounded-2xl min-h-[100%] py-[32px]">
            <UploadCloud className="w-[50px] h-[50px] text-background_content" />
            <p className="text-[1.5rem] text-background_content">
              {displayText ? displayText : "Upload Image"}
            </p>
            <p className="text-[1rem] text-background_content">
              Max size {maxUpload ? maxUpload : 5}MB
            </p>
            <input
              type="file"
              accept={fileAccept ? fileAccept : "image/*"}
              onChange={handleInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple={multipleFiles ? multipleFiles : false}
            />
          </div>

          <ScrollArea className="mt-2 max-h-[40vh]">
            {displayFiles.length > 0 &&
              displayFiles.map((file, index) => (
                <Card
                  key={index}
                  className="flex items-center mt-2 transition-all bg-transparent border-4 rounded-md border-background_content hover:bg-slate-200"
                >
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center p-4 space-x-3">
                      <FileBarChart2 className="flex-shrink-0 w-12 h-12 text-background_content" />{" "}
                      {/* Icon */}
                      <div className="font-medium text-background_content">
                        <div className="text-lg">{file.file.name}</div>{" "}
                        {/* File Name */}
                        <div className="text-zinc-500">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </div>{" "}
                        {/* File Size in MB */}
                      </div>
                    </div>
                    <div className="flex flex-row pr-4 gap-x-2">
                      <AnimatedCheckIcon
                        width={48}
                        height={48}
                        color="hsl(var(--background-content))"
                      ></AnimatedCheckIcon>
                      <ActionTooltip label="Delete">
                        <Trash2
                          onClick={(e) => onAction(e, file.id)}
                          className="flex-shrink-0 w-12 h-12 cursor-pointer text-background_content hover:text-zinc-600"
                        />
                      </ActionTooltip>
                    </div>
                  </div>
                </Card>
              ))}
          </ScrollArea>
          {!!errorMessage && (
            <p className="w-full mt-2 text-sm text-center text-red-500 text-muted-foreground">
              {errorMessage}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 w-[50%] overflow-hidden rounded-xl">
          <div className="checkered-background">
            <Image
              src={imageSrc}
              alt="collective preview image"
              width={128}
              height={128}
              className="overflow-hidden rounded-xl w-[100%]"
            />
          </div>
          <Button onClick={changeImage}> Change Image </Button>
        </div>
      )}
    </div>
  );
};

export default UploadDropZone;
