import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: {
    default: 'Magmattz — Ilustraciones & Productos',
    template: '%s | Magmattz',
  },
  description:
    'Catálogo de ilustraciones, stickers, llaveros y pines. Solo en Bolivia.',
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    siteName: 'Magmattz',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}
      >
        {children}
      </body>
    </html>
  )
}
