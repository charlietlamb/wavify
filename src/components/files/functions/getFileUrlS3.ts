'use server'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import s3 from '../../../../wasabiClient'

export default async function getFileUrlS3(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_WASABI_BUCKET,
    Key: key,
  })
  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return signedUrl
  } catch (error) {
    console.error('Error generating signed URL', error)
    throw error
  }
}
