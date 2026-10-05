import { Metadata } from 'next'
import { getObras } from '@/lib/sanity.queries'
import ObraCard from '@/components/obra/ObraCard'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Obras',
  description: 'Portafolio de ilustraciones originales.',
}

export default async function ObrasPage() {
  const obras = await getObras()

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Obras</h1>
      <p className="text-[var(--color-muted)] mb-8">Portafolio de ilustraciones originales.</p>

      {obras.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-muted)]">
          <p className="text-5xl mb-4">🎨</p>
          <p>Próximamente...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {obras.map((o) => (
            <ObraCard key={o._id} obra={o} />
          ))}
        </div>
      )}
    </section>
  )
}
