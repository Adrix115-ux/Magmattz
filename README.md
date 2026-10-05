# Página Magmattz — Catálogo Artístico

Sitio web de catálogo para artista, Fase 1. Próximamente tienda de stickers, llaveros y prints. Solo venta en Bolivia.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **Sanity** como CMS headless (Studio en `/studio`)
- **Cloudinary** para imágenes optimizadas
- **Vercel** para deploy

## Setup rápido

### 1. Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto en [sanity.io/manage](https://sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Nombre del dataset (normalmente `production`) |
| `SANITY_API_TOKEN` | Token con permisos de editor desde sanity.io/manage |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloud name de tu cuenta Cloudinary |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número con código de país, sin `+` (ej: `59170000000`) |

### 2. Sanity Studio

1. Crear proyecto en [sanity.io/manage](https://sanity.io/manage)
2. Completar `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET` en `.env.local`
3. En sanity.io/manage → API → CORS Origins, agregar `http://localhost:3000`
4. Acceder al Studio en `http://localhost:3000/studio`
5. Crear contenido de ejemplo desde el Studio

### 3. Cloudinary

1. Crear cuenta en [cloudinary.com](https://cloudinary.com)
2. Copiar el **Cloud Name** desde el Dashboard
3. Subir imágenes y copiar el **public_id** (ej: `Magmattz/obra-1`)
4. En los campos de imagen del Studio, pegar el public_id

### 4. Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### 5. Deploy en Vercel

1. Push al repositorio GitHub
2. Importar proyecto en [vercel.com](https://vercel.com)
3. Agregar las variables de entorno en Vercel → Settings → Environment Variables
4. En sanity.io/manage → API → CORS Origins, agregar la URL de producción de Vercel
5. Deploy automático en cada push a `main`

## Estructura

```
app/
  (site)/          # Páginas públicas
  studio/          # Sanity Studio embebido
components/
  layout/          # Header, Footer, WhatsApp flotante
  home/            # Secciones del inicio
  catalog/         # Grilla, filtros, variantes
  obra/            # Portafolio
  ui/              # Componentes base
lib/               # Sanity client, queries, helpers
sanity/schemas/    # Modelos de datos
```

## Fase 2 (próxima)

- Carrito de compras
- Integración de pagos (Bolivia)
- Panel de órdenes
