import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
        <p>© {new Date().getFullYear()} Magmattz. Bolivia.</p>
        <nav className="flex gap-5">
          <Link href="/catalogo" className="hover:text-[var(--color-text)] transition-colors">Catálogo</Link>
          <Link href="/obras" className="hover:text-[var(--color-text)] transition-colors">Obras</Link>
          <Link href="/contacto" className="hover:text-[var(--color-text)] transition-colors">Contacto</Link>
        </nav>
      </div>
    </footer>
  )
}
