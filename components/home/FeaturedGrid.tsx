import { Producto } from '@/lib/sanity.queries'
import ProductCard from '@/components/catalog/ProductCard'
import Button from '@/components/ui/Button'

export default function FeaturedGrid({ productos }: { productos: Producto[] }) {
  if (!productos.length) return null

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-sm text-[var(--color-accent)] font-medium mb-1">Destacados</p>
          <h2 className="text-2xl md:text-3xl font-bold">Productos seleccionados</h2>
        </div>
        <Button href="/catalogo" variant="ghost">Ver todos →</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((p) => (
          <ProductCard key={p._id} producto={p} />
        ))}
      </div>
    </section>
  )
}
