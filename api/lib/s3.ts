import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucket = process.env.AWS_S3_BUCKET!;

export async function uploadImageToS3(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<string> {
  // Use original filename extension if available, fallback to mime type
  const extension =
    fileName.split(".").pop() ?? mimeType.split("/").pop() ?? "";
  const key = `images/${uuidv4()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  });

  await s3.send(command);
  console.log(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`);
  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
