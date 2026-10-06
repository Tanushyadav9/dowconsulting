import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { requireEnv } from "@/lib/env";

export function getR2Client(): { client: S3Client; bucketName: string } {
  const accountId = requireEnv("R2_ACCOUNT_ID", "Cloudflare R2 Account ID");
  const accessKeyId = requireEnv("R2_ACCESS_KEY_ID", "Cloudflare R2 Access Key ID");
  const secretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY", "Cloudflare R2 Secret Access Key");
  const bucketName = requireEnv("R2_BUCKET_NAME", "Cloudflare R2 Bucket Name");

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return { client, bucketName };
}

/**
 * Upload a report PDF buffer to Cloudflare R2
 */
export async function uploadReportToR2(params: {
  fileBuffer: Buffer;
  key: string;
  contentType: string;
}): Promise<{ success: boolean; key: string; publicUrl?: string }> {
  const { client, bucketName } = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: params.key,
      Body: params.fileBuffer,
      ContentType: params.contentType,
    })
  );

  return {
    success: true,
    key: params.key,
    publicUrl: process.env.R2_PUBLIC_URL ? `${process.env.R2_PUBLIC_URL}/${params.key}` : undefined,
  };
}

/**
 * Generate a secure, expiring presigned download URL for a client report
 */
export async function getPresignedDownloadUrl(key: string, expiresInSeconds = 3600): Promise<string> {
  const { client, bucketName } = getR2Client();

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}
