import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import type { UploadResult } from './types'

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
  },
})

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET || 'caskit-images'
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL || ''

export async function uploadImage(buffer: Buffer, filename: string, contentType: string): Promise<UploadResult> {
  const key = `originals/${Date.now()}-${filename}`
  const thumbnailKey = `thumbnails/${Date.now()}-${filename}`

  // Upload original
  await R2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }))

  // Generate and upload thumbnail (skip if sharp unavailable)
  try {
    const thumbnail = await generateThumbnail(buffer)
    await R2.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: thumbnailKey,
      Body: thumbnail,
      ContentType: 'image/webp',
    }))
  } catch {
    // sharp not available — use original as thumbnail
  }

  return {
    key,
    url: `${PUBLIC_URL}/${key}`,
    thumbnailKey,
    thumbnailUrl: `${PUBLIC_URL}/${thumbnailKey}`,
  }
}

export async function generateThumbnail(buffer: Buffer, width = 200): Promise<Buffer> {
  try {
    const sharp = (await import('sharp')).default
    return sharp(buffer)
      .resize(width, undefined, { fit: 'inside' })
      .webp({ quality: 80 })
      .toBuffer()
  } catch {
    // sharp not available (Node 25+) — return original buffer
    return buffer
  }
}

export function getImageUrl(key: string): string {
  return `${PUBLIC_URL}/${key}`
}
