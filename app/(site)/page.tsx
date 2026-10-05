import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import CollectionsStrip from '@/components/home/CollectionsStrip'
import CTA from '@/components/home/CTA'
import {
  getProductosDestacados,
  getObrasDestacadas,
  getColecciones,
} from '@/lib/sanity.queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Catálogo de ilustraciones, stickers, llaveros y prints hechos en Bolivia.',
}

export default async function HomePage() {
  const [productosDestacados, , colecciones] = await Promise.all([
    getProductosDestacados(),
    getObrasDestacadas(),
    getColecciones(),
  ])

  return (
    <>
      <Hero />
      <FeaturedGrid productos={productosDestacados} />
      <CollectionsStrip colecciones={colecciones} />
      <CTA />
    </>
  )
}
