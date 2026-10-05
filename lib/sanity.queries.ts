import { client } from './sanity.client'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Variante {
  nombre: string
  precio?: number
  disponible: boolean
}

export interface ImagenCloudinary {
  publicId: string
  alt?: string
}

export interface Categoria {
  _id: string
  nombre: string
  slug: { current: string }
  descripcion?: string
}

export interface Coleccion {
  _id: string
  nombre: string
  slug: { current: string }
  descripcion?: string
  imagen?: string
}

export interface Producto {
  _id: string
  nombre: string
  slug: { current: string }
  descripcion?: string
  imagenes?: ImagenCloudinary[]
  tipo: 'sticker' | 'llavero' | 'pin' | 'otro'
  precio?: number
  disponible: boolean
  destacado?: boolean
  obraRelacionada?: { _id: string; titulo: string; slug: { current: string } }
  coleccion?: Coleccion
  variantes?: Variante[]
}

export interface Obra {
  _id: string
  titulo: string
  slug: { current: string }
  descripcion?: string
  imagenes?: ImagenCloudinary[]
  anio?: number
  categoria?: Categoria
  destacada?: boolean
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const PRODUCTO_FIELDS = `
  _id, nombre,
  slug, descripcion,
  imagenes[]{ publicId, alt },
  tipo, precio, disponible, destacado,
  obraRelacionada->{ _id, titulo, slug },
  coleccion->{ _id, nombre, slug },
  variantes[]{ nombre, precio, disponible }
`

const OBRA_FIELDS = `
  _id, titulo, slug, descripcion,
  imagenes[]{ publicId, alt },
  anio, destacada,
  categoria->{ _id, nombre, slug }
`

/**
 * Wrapper to safely execute Sanity queries even if the project is not yet configured.
 * This prevents the Next.js build from crashing due to missing environment variables.
 */
async function safeFetch<T>(query: string, params: any = {}, options: any = {}, fallback: T): Promise<T> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || projectId === 'demo' || projectId === 'replace-me') {
    return fallback
  }
  try {
    return await client.fetch(query, params, options)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return fallback
  }
}

// Home
export async function getProductosDestacados(): Promise<Producto[]> {
  return safeFetch(
    `*[_type == "producto" && destacado == true] | order(_createdAt desc)[0..7] { ${PRODUCTO_FIELDS} }`,
    {},
    { next: { revalidate: 60 } },
    []
  )
}

export async function getObrasDestacadas(): Promise<Obra[]> {
  return safeFetch(
    `*[_type == "obra" && destacada == true] | order(_createdAt desc)[0..5] { ${OBRA_FIELDS} }`,
    {},
    { next: { revalidate: 60 } },
    []
  )
}

export async function getColecciones(): Promise<Coleccion[]> {
  return safeFetch(
    `*[_type == "coleccion"] | order(nombre asc) { _id, nombre, slug, descripcion, imagen }`,
    {},
    { next: { revalidate: 60 } },
    []
  )
}

// Catálogo
export async function getProductos(params?: {
  tipo?: string
  coleccionSlug?: string
}): Promise<Producto[]> {
  let filter = '_type == "producto"'
  if (params?.tipo) filter += ` && tipo == "${params.tipo}"`
  if (params?.coleccionSlug)
    filter += ` && coleccion->slug.current == "${params.coleccionSlug}"`
  return safeFetch(
    `*[${filter}] | order(_createdAt desc) { ${PRODUCTO_FIELDS} }`,
    {},
    { next: { revalidate: 60 } },
    []
  )
}

export async function getProductoBySlug(slug: string): Promise<Producto | null> {
  return safeFetch(
    `*[_type == "producto" && slug.current == $slug][0] { ${PRODUCTO_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } },
    null
  )
}

export async function getProductosSlugs(): Promise<{ slug: string }[]> {
  return safeFetch(
    `*[_type == "producto"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } },
    []
  )
}

// Obras
export async function getObras(): Promise<Obra[]> {
  return safeFetch(
    `*[_type == "obra"] | order(anio desc) { ${OBRA_FIELDS} }`,
    {},
    { next: { revalidate: 60 } },
    []
  )
}

export async function getObraBySlug(slug: string): Promise<Obra | null> {
  return safeFetch(
    `*[_type == "obra" && slug.current == $slug][0] { ${OBRA_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } },
    null
  )
}

export async function getObrasSlugs(): Promise<{ slug: string }[]> {
  return safeFetch(
    `*[_type == "obra"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } },
    []
  )
}

export async function getProductosByObra(obraId: string): Promise<Producto[]> {
  return safeFetch(
    `*[_type == "producto" && obraRelacionada._ref == $obraId] { ${PRODUCTO_FIELDS} }`,
    { obraId },
    { next: { revalidate: 60 } },
    []
  )
}

// Slugs para sitemap
export async function getAllSlugs() {
  const [productos, obras] = await Promise.all([
    getProductosSlugs(),
    getObrasSlugs(),
  ])
  return { productos, obras }
}
