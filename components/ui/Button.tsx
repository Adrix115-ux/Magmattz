import { ButtonHTMLAttributes } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  href?: string
  external?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]',
  secondary:
    'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-gray-50',
  ghost:
    'text-[var(--color-accent)] hover:underline',
}

export default function Button({
  variant = 'primary',
  href,
  external,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
  const cls = `${base} ${variantClasses[variant]} ${className}`

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
