import Link from 'next/link'
import Image from 'next/image'
import { Obra } from '@/lib/sanity.queries'
import { cloudinaryUrl } from '@/lib/sanity.image'
import Badge from '@/components/ui/Badge'

export default function ObraCard({ obra }: { obra: Obra }) {
  const img = obra.imagenes?.[0]
  const src = img?.publicId
    ? cloudinaryUrl(img.publicId, { width: 500, height: 500, crop: 'fill' })
    : null

  return (
    <Link
      href={`/obras/${obra.slug.current}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={img?.alt ?? obra.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl">
            🎨
          </div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="font-medium text-sm line-clamp-2">{obra.titulo}</p>
        <div className="flex items-center gap-2">
          {obra.anio && <span className="text-xs text-[var(--color-muted)]">{obra.anio}</span>}
          {obra.categoria && (
            <Badge variant="muted">{obra.categoria.nombre}</Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
