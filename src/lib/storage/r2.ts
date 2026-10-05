import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || "dow-consulting-reports";

export function getR2Client(): S3Client | null {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.warn("Cloudflare R2 credentials missing; file storage client disabled.");
    return null;
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Upload a report PDF buffer to Cloudflare R2
 */
export async function uploadReportToR2(params: {
  fileBuffer: Buffer;
  key: string;
  contentType: string;
}): Promise<{ success: boolean; key: string; publicUrl?: string }> {
  const r2 = getR2Client();
  if (!r2) {
    console.warn("Simulating R2 upload (missing credentials)");
    return {
      success: true,
      key: params.key,
      publicUrl: `/simulated-storage/${params.key}`,
    };
  }

  await r2.send(
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
  const r2 = getR2Client();
  if (!r2) {
    return `/api/reports/download?key=${encodeURIComponent(key)}`;
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(r2, command, { expiresIn: expiresInSeconds });
}
