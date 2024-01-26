"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../../../wasabiClient";

export async function uploadCollectiveImageToS3(
  base64: string | null,
  id: string
) {
  if (base64 === null) {
    return;
  }
  const base64Data = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const params = {
    Bucket: process.env.NEXT_PUBLIC_WASABI_COLLECTIVES_BUCKET,
    Key: `${id}/images/main_pic.jpg`,
    Body: base64Data,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
}
