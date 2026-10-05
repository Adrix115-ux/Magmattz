export function buildWhatsAppLink(productName: string, variantName?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const variant = variantName ? ` (${variantName})` : ''
  const message = encodeURIComponent(
    `Hola, me interesa ${productName}${variant}`
  )
  return `https://wa.me/${number}?text=${message}`
}
