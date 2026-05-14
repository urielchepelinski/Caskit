// Image storage — R2/S3 removed, images served via Supabase Storage
import type { UploadResult } from './types'

export async function uploadImage(_buffer: Buffer, _filename: string, _contentType: string): Promise<UploadResult> {
  throw new Error('Image upload via R2 is disabled — use Supabase Storage instead')
}

export async function generateThumbnail(buffer: Buffer, _width = 200): Promise<Buffer> {
  return buffer
}

export function getImageUrl(key: string): string {
  return key
}
