import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import s3 from '../../../../wasabiClient'

export async function deleteFileFromS3(url: string) {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_WASABI_CHATS_BUCKET,
    Key: url,
  }

  const command = new DeleteObjectCommand(params)
  await s3.send(command)
}
