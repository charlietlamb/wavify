import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import isObject from "@/lib/isObject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "../../../hooks/use-modal-store";
import UploadDropZone from "../util/uploads/UploadDropZone";
import { uploadFileToS3 } from "./modal-actions/uploadFile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ButtonLoader from "../me/ButtonLoader";

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const isModalOpen = isOpen && type === "messageFile";
  const { chat: chatData, collective, user } = data;

  function addFile(upload: File | File[] | null) {
    if (Array.isArray(upload)) {
      setFiles((prevFiles) => [...prevFiles, ...upload]);
    } else {
      if (upload) {
        setFiles((prevFiles) => [...prevFiles, upload]);
      }
    }
  }

  const handleClose = () => {
    onClose();
  };

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("FileReader did not return a string."));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const onSubmit = async () => {
    if (files.length > 0) {
      setLoading(true);
      try {
        var toSetFiles: Json[] = []; // Assuming Json is a type that can represent your file objects

        for (const file of files) {
          var fileId = uuidv4();
          var ext = file.name.split(".").pop();
          var url = `${isObject(chatData) ? chatData.id : ""}/${fileId}.${
            ext ? ext : ""
          }`;
          const base64File = await fileToBase64(file);
          await uploadFileToS3(base64File, file.type, url, file.name);
          toSetFiles.push({
            fileId,
            fileExt: ext,
            fileName: file.name,
            fileSize: file.size / 1024 / 1024,
            fileUrl: `${
              isObject(chatData) ? chatData.id : ""
            }/${fileId}.${ext}`,
          });
        }

        setFiles([]);
        const messageId = uuidv4();
        var newMessage: Json = {
          id: messageId,
          author: user ? user.id : "undefined",
          files: toSetFiles,
          chat: chatData?.id,
        };

        await supabase.from("messages").insert(newMessage);
        setLoading(false);
        router.refresh();
        handleClose();
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-2xl font-bold text-left">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-left justify-center w-full">
          <div className="w-[80%]">
            <UploadDropZone
              uploadFunction={addFile}
              maxUpload={500}
              multipleFiles={true}
              displayText={"Upload Files"}
              fileAccept="*"
              color="#FFFFFF"
            />
          </div>
        </div>
        <DialogFooter className="px-6 py-4 ">
          <ButtonLoader
            disabled={loading}
            onClick={onSubmit}
            isLoading={loading}
            text="Sent"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
