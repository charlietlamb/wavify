import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UploadImagePreview({
  imageSrc,
  changeImage,
}: {
  imageSrc: string;
  changeImage: () => void;
}) {
  return (
    <div className="flex flex-col gap-y-4 w-[50%] overflow-hidden rounded-xl items-center py-4">
      <div className="checkered-background relative w-[240px] h-[240px] rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt="collective preview image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-xl"
        />
      </div>
      <Button onClick={changeImage}> Change Image </Button>
    </div>
  );
}
