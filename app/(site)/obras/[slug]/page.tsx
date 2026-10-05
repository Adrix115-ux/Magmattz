import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getObraBySlug, getObrasSlugs, getProductosByObra } from '@/lib/sanity.queries'
import { cloudinaryUrl } from '@/lib/sanity.image'
import ObraGallery from '@/components/obra/ObraGallery'
import RelatedProducts from '@/components/obra/RelatedProducts'
import Badge from '@/components/ui/Badge'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getObrasSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const obra = await getObraBySlug(slug)
  if (!obra) return {}
  const img = obra.imagenes?.[0]
  return {
    title: obra.titulo,
    description: obra.descripcion,
    openGraph: img
      ? { images: [{ url: cloudinaryUrl(img.publicId, { width: 1200, height: 630 }) }] }
      : undefined,
  }
}

export default async function ObraPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const obra = await getObraBySlug(slug)
  if (!obra) notFound()

  const productosRelacionados = await getProductosByObra(obra._id)

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <ObraGallery imagenes={obra.imagenes ?? []} titulo={obra.titulo} />

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{obra.titulo}</h1>

          <div className="flex flex-wrap gap-2">
            {obra.anio && (
              <Badge variant="muted">{obra.anio}</Badge>
            )}
            {obra.categoria && (
              <Badge variant="accent">{obra.categoria.nombre}</Badge>
            )}
          </div>

          {obra.descripcion && (
            <p className="text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
              {obra.descripcion}
            </p>
          )}
        </div>
      </div>

      <RelatedProducts productos={productosRelacionados} />
    </section>
  )
}
