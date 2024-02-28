'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3 from '../../../../wasabiClient'

export async function uploadFileToS3(
  base64: string,
  mimeType: string,
  url: string,
  fileName: string
) {
  // Assuming the base64 string includes the MIME type; if not, this line can be omitted
  const base64Data = Buffer.from(base64.split(',')[1], 'base64')
  const params = {
    Bucket: process.env.NEXT_PUBLIC_WASABI_BUCKET,
    Key: url, // Adjust the key as needed
    Body: base64Data,
    ContentType: mimeType,
    ContentDeposition: `attachment; filename=${fileName}"`,
  }

  const command = new PutObjectCommand(params)
  const res = await s3.send(command)
  return res.$metadata.httpStatusCode === 200 ? false : true
}
