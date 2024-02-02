"use server";
import s3 from "../../../../wasabiClient";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export default async function downloadChatImage(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_WASABI_CHATS_BUCKET,
    Key: key,
  });
  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error("Error generating signed URL", error);
    throw error;
  }
}
