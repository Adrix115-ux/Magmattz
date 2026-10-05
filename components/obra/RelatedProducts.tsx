import { Producto } from '@/lib/sanity.queries'
import ProductCard from '@/components/catalog/ProductCard'

export default function RelatedProducts({ productos }: { productos: Producto[] }) {
  if (!productos.length) return null

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold mb-5">Productos relacionados</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((p) => (
          <ProductCard key={p._id} producto={p} />
        ))}
      </div>
    </section>
  )
}
