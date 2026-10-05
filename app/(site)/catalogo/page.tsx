import { Metadata } from 'next'
import { Suspense } from 'react'
import { getProductos, getColecciones } from '@/lib/sanity.queries'
import ProductGrid from '@/components/catalog/ProductGrid'
import FilterBar from '@/components/catalog/FilterBar'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Stickers, llaveros y pines disponibles en Bolivia.',
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; coleccion?: string }>
}) {
  const params = await searchParams
  const [productos, colecciones] = await Promise.all([
    getProductos({ tipo: params.tipo, coleccionSlug: params.coleccion }),
    getColecciones(),
  ])

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Catálogo</h1>
      <p className="text-[var(--color-muted)] mb-8">Stickers, llaveros y pines disponibles en Bolivia.</p>

      <Suspense>
        <FilterBar colecciones={colecciones} />
      </Suspense>

      <div className="mt-8">
        <ProductGrid productos={productos} />
      </div>
    </section>
  )
}
