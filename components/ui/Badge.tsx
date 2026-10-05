type BadgeVariant = 'default' | 'accent' | 'muted'

const classes: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  accent: 'bg-amber-100 text-amber-800',
  muted: 'bg-gray-50 text-gray-500',
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        classes[variant]
      } ${className}`}
    >
      {children}
    </span>
  )
}
