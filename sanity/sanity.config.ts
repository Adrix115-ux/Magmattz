import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'pagina-Magmattz',
  title: 'Página Magmattz — CMS',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
})
