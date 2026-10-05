import { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: 'Conoce a la artista detrás de las ilustraciones.',
}

export default function SobreMiPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Sobre mí</h1>

      <div className="space-y-5 text-[var(--color-muted)] leading-relaxed">
        <p>
          Hola, soy Magmattz 🌸 Artista e ilustradora boliviana. Creo personajes,
          escenas y mundos llenos de color y emoción.
        </p>
        <p>
          Mi trabajo nace de la observación de la vida cotidiana, la naturaleza
          y las historias que nos rodean. Cada pieza tiene un poco de mi alma.
        </p>
        <p>
          Aquí encontrarás mi catálogo de productos: stickers, llaveros y pines
          disponibles solo en Bolivia. También puedo hacer encargos personalizados.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/catalogo" variant="primary">Ver catálogo</Button>
        <Button href="/contacto" variant="secondary">Contactarme</Button>
      </div>
    </section>
  )
}
