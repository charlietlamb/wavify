// wasabiClient.ts
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_WASABI_REGION || 'us-east-1', // Default to 'us-east-1' if the region is not set
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_WASABI_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_PUBLIC_WASABI_SECRET_ACCESS_KEY || '',
    },
    endpoint:'https://s3.wasabisys.com', // Set your Wasabi endpoint
    forcePathStyle: true, // Use path-style addressing
});

export default s3;
