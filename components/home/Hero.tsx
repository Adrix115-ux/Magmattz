import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 flex flex-col items-center text-center gap-6">
        <p className="text-sm uppercase tracking-widest text-[var(--color-accent)] font-medium">
          Ilustraciones · Stickers · Pines · Bolivia
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Arte que puedes
          <span className="text-[var(--color-accent)]"> llevar contigo</span>
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-xl">
          Stickers, llaveros y pines hechos con amor. Catálogo disponible solo en Bolivia.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="/catalogo" variant="primary">Ver catálogo</Button>
          <Button href="/obras" variant="secondary">Ver obras</Button>
        </div>
      </div>

      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-100 opacity-40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-orange-100 opacity-40 blur-3xl pointer-events-none"
      />
    </section>
  )
}
