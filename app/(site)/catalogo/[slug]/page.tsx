import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductoBySlug, getProductosSlugs } from '@/lib/sanity.queries'
import { cloudinaryUrl } from '@/lib/sanity.image'
import Badge from '@/components/ui/Badge'
import VariantSelector from '@/components/catalog/VariantSelector'
import Button from '@/components/ui/Button'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getProductosSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const producto = await getProductoBySlug(slug)
  if (!producto) return {}
  const img = producto.imagenes?.[0]
  return {
    title: producto.nombre,
    description: producto.descripcion,
    openGraph: img
      ? { images: [{ url: cloudinaryUrl(img.publicId, { width: 1200, height: 630 }) }] }
      : undefined,
  }
}

const TIPO_LABEL: Record<string, string> = {
  sticker: 'Sticker',
  llavero: 'Llavero',
  pin: 'Pin',
  otro: 'Otro',
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const producto = await getProductoBySlug(slug)
  if (!producto) notFound()

  const imagenes = producto.imagenes ?? []
  const precio =
    producto.variantes?.find((v) => v.disponible && v.precio)?.precio ??
    producto.precio

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="space-y-3">
          {imagenes.length > 0 ? (
            <>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={cloudinaryUrl(imagenes[0].publicId, { width: 800, height: 800, crop: 'fill' })}
                  alt={imagenes[0].alt ?? producto.nombre}
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
                        src={cloudinaryUrl(img.publicId, { width: 200, height: 200, crop: 'fill' })}
                        alt={img.alt ?? ''}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center text-6xl">
              🖼️
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <h1 className="text-2xl md:text-3xl font-bold flex-1">{producto.nombre}</h1>
            <Badge variant="accent">{TIPO_LABEL[producto.tipo] ?? producto.tipo}</Badge>
          </div>

          {precio && (
            <p className="text-2xl font-bold text-[var(--color-accent)]">Bs {precio}</p>
          )}

          {producto.descripcion && (
            <p className="text-[var(--color-muted)] leading-relaxed">{producto.descripcion}</p>
          )}

          {producto.coleccion && (
            <p className="text-sm">
              Colección:{' '}
              <Button href={`/catalogo?coleccion=${producto.coleccion.slug.current}`} variant="ghost">
                {producto.coleccion.nombre}
              </Button>
            </p>
          )}

          {!producto.disponible ? (
            <div className="rounded-xl border border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
              Este producto no está disponible en este momento.
            </div>
          ) : (
            <VariantSelector
              productName={producto.nombre}
              variantes={producto.variantes ?? []}
            />
          )}

          {producto.obraRelacionada && (
            <Button
              href={`/obras/${producto.obraRelacionada.slug.current}`}
              variant="secondary"
            >
              Ver obra relacionada →
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
