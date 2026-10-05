'use client'

import { useState } from 'react'
import { Variante } from '@/lib/sanity.queries'
import Button from '@/components/ui/Button'
import { buildWhatsAppLink } from '@/lib/whatsapp'

export default function VariantSelector({
  productName,
  variantes,
}: {
  productName: string
  variantes: Variante[]
}) {
  const available = variantes.filter((v) => v.disponible !== false)
  const [selected, setSelected] = useState<Variante | null>(available[0] ?? null)

  const waLink = buildWhatsAppLink(productName, selected?.nombre)

  return (
    <div className="space-y-4">
      {available.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Variantes</p>
          <div className="flex flex-wrap gap-2">
            {available.map((v) => (
              <button
                key={v.nombre}
                onClick={() => setSelected(v)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  selected?.nombre === v.nombre
                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                    : 'border-[var(--color-border)] hover:border-gray-400'
                }`}
              >
                {v.nombre}
                {v.precio ? ` — Bs ${v.precio}` : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button href={waLink} variant="primary" external className="w-full justify-center">
        💬 Consultar por WhatsApp
      </Button>
    </div>
  )
}
