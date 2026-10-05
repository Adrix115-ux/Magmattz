'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/obras', label: 'Obras' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)]/90 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-xl tracking-tight hover:text-[var(--color-accent)] transition-colors">
          Magmattz
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm border-b border-[var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
