import { UploadCloud } from "lucide-react";
import { handleInput } from "./functions/handleInput";
import { Dispatch, SetStateAction } from "react";
type DisplayFile = {
  file: File;
  id: string;
};
interface UploadInputProps {
  maxUpload?: number;
  multipleFiles?: boolean;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setImageSrc: Dispatch<SetStateAction<string>>;
  setUploaded: Dispatch<SetStateAction<boolean>>;
  uploadFunction: (imageFile: File | File[]) => void;
  displayFiles: DisplayFile[];
  setDisplayFiles: Dispatch<SetStateAction<DisplayFile[]>>;
  color?: string;
  displayText?: string;
  fileAccept?: string;
}

export default function UploadInput({
  maxUpload,
  multipleFiles,
  setErrorMessage,
  setImageSrc,
  setUploaded,
  uploadFunction,
  displayFiles,
  setDisplayFiles,
  color,
  displayText,
  fileAccept,
}: UploadInputProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full text-white border-4 border-dashed rounded-2xl min-h-[100%] py-[32px]"
      style={{
        borderColor: color ? color : "hsl(var(--background-content))",
      }}
    >
      <UploadCloud
        className="w-[50px] h-[50px]"
        style={{
          color: color ? color : "hsl(var(--background-content))",
        }}
      />
      <p
        className="text-[1.5rem] text-background_content"
        style={{
          color: color ? color : "hsl(var(--background-content))",
        }}
      >
        {displayText ? displayText : "Upload Image"}
      </p>
      <p
        className="text-[1rem]"
        style={{
          color: color ? color : "hsl(var(--background-content))",
        }}
      >
        Max size {maxUpload ? maxUpload : 5}MB
      </p>
      <input
        type="file"
        accept={fileAccept ? fileAccept : "image/*"}
        onChange={(e) =>
          handleInput(
            e,
            maxUpload,
            multipleFiles,
            setErrorMessage,
            setImageSrc,
            setUploaded,
            uploadFunction,
            displayFiles,
            setDisplayFiles
          )
        }
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        multiple={multipleFiles ? multipleFiles : false}
      />
    </div>
  );
}
