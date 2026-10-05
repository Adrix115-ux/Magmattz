import Image from 'next/image'
import { cloudinaryUrl } from '@/lib/sanity.image'

interface SanityImageProps {
  publicId: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  crop?: string
}

export default function SanityImage({
  publicId,
  alt,
  width,
  height,
  className = '',
  priority = false,
  crop,
}: SanityImageProps) {
  const src = cloudinaryUrl(publicId, { width: width * 2, height: height * 2, crop })
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
