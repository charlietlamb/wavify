import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../../../wasabiClient";


async function uploadFileToS3(file : Buffer, fileName : string, userId: string){
  const fileBuffer = file;
  console.log("trying to upload"+fileName)

  const params = {
    Bucket: process.env.NEXT_PUBLIC_WASABI_USERS_BUCKET,
    Key: `${userId}/images/profile_pic.jpg`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  }
  
  const command = new PutObjectCommand(params);
  await s3.send(command);
  return fileName
}

export async function POST(request: any){
  try{
    const formData = await request.formData();
    const file = formData.get("file")
    const user = formData.get("user")

    if(!file){
      return NextResponse.json({error: "File is required."})
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer,file.name,user);
    return NextResponse.json({success: true, fileName})

  }catch (error){
    return NextResponse.json({error})
  }
}