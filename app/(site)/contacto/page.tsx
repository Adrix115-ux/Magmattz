import { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta a Magmattz por WhatsApp o redes sociales.',
}

export default function ContactoPage() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const waLink = `https://wa.me/${number}?text=${encodeURIComponent('Hola Magmattz, me gustaría contactarte 🌸')}`

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contacto</h1>
      <p className="text-[var(--color-muted)] mb-8">
        La forma más rápida de contactarme es por WhatsApp. Respondo en Bolivia.
      </p>

      <div className="space-y-4">
        {/* WhatsApp */}
        <div className="rounded-2xl border border-[var(--color-border)] p-6">
          <h2 className="font-semibold text-lg mb-1">WhatsApp</h2>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Para pedidos, preguntas o encargos personalizados.
          </p>
          <Button href={waLink} variant="primary" external>
            💬 Escribir por WhatsApp
          </Button>
        </div>

        {/* Instagram */}
        <div className="rounded-2xl border border-[var(--color-border)] p-6">
          <h2 className="font-semibold text-lg mb-1">Instagram</h2>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Seguime para ver mis últimas ilustraciones.
          </p>
          <Button
            href="https://www.instagram.com/magmattz/"
            variant="secondary"
            external
          >
            @Magmattz
          </Button>
        </div>
      </div>
    </section>
  )
}
