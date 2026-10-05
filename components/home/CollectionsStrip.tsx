import { Coleccion } from '@/lib/sanity.queries'
import { cloudinaryUrl } from '@/lib/sanity.image'
import Link from 'next/link'
import Image from 'next/image'

export default function CollectionsStrip({ colecciones }: { colecciones: Coleccion[] }) {
  if (!colecciones.length) return null

  return (
    <section className="bg-[var(--color-surface)] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm text-[var(--color-accent)] font-medium mb-1">Colecciones</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Explora por colección</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {colecciones.map((col) => (
            <Link
              key={col._id}
              href={`/catalogo?coleccion=${col.slug.current}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 flex items-end"
            >
              {col.imagen ? (
                <Image
                  src={cloudinaryUrl(col.imagen, { width: 600, height: 450, crop: 'fill' })}
                  alt={col.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100" />
              )}
              <div className="relative p-5 w-full bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white font-semibold text-lg">{col.nombre}</h3>
                {col.descripcion && (
                  <p className="text-white/80 text-sm line-clamp-1">{col.descripcion}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
