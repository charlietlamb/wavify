import { useRef, useState } from "react";
interface dropZoneProps {
  uploadFunction: (imageFile: File | File[]) => void;
  imageUrl?: string;
  maxUpload?: number; //in MB
  multipleFiles?: boolean;
  displayText?: string;
  fileAccept?: string;
  color?: string;
}
import { useUploadScrollEffect } from "./hooks/useUploadScrollEffect";
import UploadImagePreview from "./UploadImagePreview";
import UploadFilesPreview from "./UploadFilesPreview";
import UploadInput from "./UploadInput";

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
  color,
}: dropZoneProps) => {
  const [uploaded, setUploaded] = imageUrl ? useState(true) : useState(false);
  const [imageSrc, setImageSrc] = imageUrl ? useState(imageUrl) : useState("");
  const [displayFiles, setDisplayFiles] = useState<DisplayFile[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  useUploadScrollEffect(displayFiles, scrollRef);
  function changeImage() {
    setUploaded(false);
  }
  return (
    <div className=" h-auto w-[100%] flex items-center justify-center">
      {!uploaded ? (
        <div className="flex z-1 min-h-[100%] w-full flex-col gap-y-2">
          <UploadInput
            maxUpload={maxUpload}
            multipleFiles={multipleFiles}
            setErrorMessage={setErrorMessage}
            setImageSrc={setImageSrc}
            setUploaded={setUploaded}
            uploadFunction={uploadFunction}
            displayFiles={displayFiles}
            setDisplayFiles={setDisplayFiles}
            color={color}
            displayText={displayText}
            fileAccept={fileAccept}
          />
          <UploadFilesPreview
            displayFiles={displayFiles}
            setDisplayFiles={setDisplayFiles}
            scrollRef={scrollRef}
            color={color}
          />
          {!!errorMessage && (
            <p className="w-full mt-2 text-sm text-center text-red-500 text-muted-foreground">
              {errorMessage}
            </p>
          )}
        </div>
      ) : (
        <UploadImagePreview imageSrc={imageSrc} changeImage={changeImage} />
      )}
    </div>
  );
};

export default UploadDropZone;
