import { useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PercentCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import { UploadCloud } from "lucide-react";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageProps {
  updateAvatar: (imgSrc: string) => void;
  closeModal: () => void;
  setURL: (url: string) => void;
  user: User
}

const ImageCropper = ({ closeModal, updateAvatar, setURL, user }: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState("");

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        if(e.currentTarget){
          const image = e.currentTarget as HTMLImageElement;
          const { naturalWidth, naturalHeight } = image;
          if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setError("Image must be at least 150 x 150 pixels.");
            return setImgSrc("");
          }
        }
        
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      {!imgSrc && (
        <div className="absolute inset-0 flex p-16 z-1">
          <div className="relative flex flex-col items-center justify-center w-full text-white border-4 border-white border-dashed rounded-2xl">
            <UploadCloud className="w-[100px] h-[100px]" />
            <p className="text-[2.5rem]">Upload Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center justify-center h-full">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ height: "40vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="px-4 py-2 mt-4 text-xs text-black rounded-2xl bg-primary hover:bg-primary_dark"
            onClick={() => {
              if(crop && imgRef.current && previewCanvasRef.current){
                setCanvasPreview(
                  imgRef.current, // HTMLImageElement
                  previewCanvasRef.current, // HTMLCanvasElement
                  convertToPixelCrop(
                    crop,
                    !!imgRef.current ? imgRef.current.width : 0,
                    !!imgRef.current ? imgRef.current.height : 0,
                  )
                );
              }
              var dataUrl = ''
              if(previewCanvasRef.current){
                dataUrl = previewCanvasRef.current.toDataURL();
              }
              updateAvatar(dataUrl);
              closeModal();
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;
