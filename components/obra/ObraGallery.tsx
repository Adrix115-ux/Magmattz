import Image from 'next/image'
import { ImagenCloudinary } from '@/lib/sanity.queries'
import { cloudinaryUrl } from '@/lib/sanity.image'

export default function ObraGallery({
  imagenes,
  titulo,
}: {
  imagenes: ImagenCloudinary[]
  titulo: string
}) {
  if (!imagenes.length) {
    return (
      <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center text-6xl">
        🎨
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
        <Image
          src={cloudinaryUrl(imagenes[0].publicId, { width: 900, height: 900, crop: 'fill' })}
          alt={imagenes[0].alt ?? titulo}
          fill
          className="object-cover"
          priority
        />
      </div>
      {imagenes.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {imagenes.slice(1).map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={cloudinaryUrl(img.publicId, { width: 220, height: 220, crop: 'fill' })}
                alt={img.alt ?? ''}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
