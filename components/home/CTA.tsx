import Button from '@/components/ui/Button'

export default function CTA() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const waLink = `https://wa.me/${number}?text=${encodeURIComponent('Hola, me gustaría conocer más sobre tus productos 🌸')}`

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-accent)] text-white px-8 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Te interesa algo?</h2>
        <p className="text-white/85 text-lg mb-8 max-w-lg mx-auto">
          Escríbeme por WhatsApp y te ayudo con tu pedido. Solo envíos en Bolivia.
        </p>
        <Button href={waLink} variant="secondary" external>
          Consultar por WhatsApp
        </Button>
        {/* Decorative */}
        <div aria-hidden className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div aria-hidden className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
      </div>
    </section>
  )
}
