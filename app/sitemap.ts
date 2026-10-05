import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/sanity.queries'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { productos, obras } = await getAllSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/catalogo`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/obras`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/sobre-mi`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contacto`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const productoRoutes: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${base}/catalogo/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const obraRoutes: MetadataRoute.Sitemap = obras.map((o) => ({
    url: `${base}/obras/${o.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...productoRoutes, ...obraRoutes]
}
