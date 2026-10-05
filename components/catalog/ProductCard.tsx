import Link from 'next/link'
import Image from 'next/image'
import { Producto } from '@/lib/sanity.queries'
import { cloudinaryUrl } from '@/lib/sanity.image'
import Badge from '@/components/ui/Badge'

const TIPO_LABEL: Record<string, string> = {
  sticker: 'Sticker',
  llavero: 'Llavero',
  pin: 'Pin',
  otro: 'Otro',
}

export default function ProductCard({ producto }: { producto: Producto }) {
  const img = producto.imagenes?.[0]
  const src = img?.publicId
    ? cloudinaryUrl(img.publicId, { width: 400, height: 400, crop: 'fill' })
    : null

  const precio = producto.variantes?.find((v) => v.disponible && v.precio)?.precio ?? producto.precio

  return (
    <Link
      href={`/catalogo/${producto.slug.current}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={img?.alt ?? producto.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl">
            🖼️
          </div>
        )}
        {!producto.disponible && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <Badge variant="muted">No disponible</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-1">
          <p className="text-sm font-medium line-clamp-2 flex-1">{producto.nombre}</p>
          <Badge variant="default" className="shrink-0">
            {TIPO_LABEL[producto.tipo] ?? producto.tipo}
          </Badge>
        </div>
        {precio && (
          <p className="text-sm font-semibold text-[var(--color-accent)]">Bs {precio}</p>
        )}
      </div>
    </Link>
  )
}
