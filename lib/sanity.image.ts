/**
 * Builds a Cloudinary URL from a public_id.
 * Sanity stores only the public_id; Cloudinary serves the actual image.
 */
export function cloudinaryUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number
    crop?: string
  } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName || !publicId) return '/placeholder.svg'

  const transforms: string[] = ['f_auto']
  if (options.quality) transforms.push(`q_${options.quality}`)
  else transforms.push('q_auto')
  if (options.width) transforms.push(`w_${options.width}`)
  if (options.height) transforms.push(`h_${options.height}`)
  if (options.crop) transforms.push(`c_${options.crop}`)

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${publicId}`
}
