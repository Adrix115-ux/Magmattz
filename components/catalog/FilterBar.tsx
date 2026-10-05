'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Coleccion } from '@/lib/sanity.queries'

const TIPOS = [
  { value: '', label: 'Todos' },
  { value: 'sticker', label: 'Stickers' },
  { value: 'llavero', label: 'Llaveros' },
  { value: 'pin', label: 'Pines' },
  { value: 'otro', label: 'Otros' },
]

export default function FilterBar({ colecciones }: { colecciones: Coleccion[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    router.push(`${pathname}?${next.toString()}`)
  }

  const tipo = params.get('tipo') ?? ''
  const coleccion = params.get('coleccion') ?? ''

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Tipo */}
      <div className="flex gap-1.5 flex-wrap">
        {TIPOS.map((t) => (
          <button
            key={t.value}
            onClick={() => update('tipo', t.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              tipo === t.value
                ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                : 'border-[var(--color-border)] hover:border-gray-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Colección */}
      {colecciones.length > 0 && (
        <select
          value={coleccion}
          onChange={(e) => update('coleccion', e.target.value)}
          className="text-sm border border-[var(--color-border)] rounded-lg px-3 py-1.5 bg-[var(--color-surface)] cursor-pointer"
        >
          <option value="">Todas las colecciones</option>
          {colecciones.map((c) => (
            <option key={c._id} value={c.slug.current}>
              {c.nombre}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
