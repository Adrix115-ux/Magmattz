import { Producto } from '@/lib/sanity.queries'
import ProductCard from './ProductCard'

export default function ProductGrid({ productos }: { productos: Producto[] }) {
  if (!productos.length) {
    return (
      <div className="text-center py-20 text-[var(--color-muted)]">
        <p className="text-5xl mb-4">🌸</p>
        <p>No hay productos que coincidan con los filtros.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {productos.map((p) => (
        <ProductCard key={p._id} producto={p} />
      ))}
    </div>
  )
}
