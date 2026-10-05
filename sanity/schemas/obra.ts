import { defineField, defineType } from 'sanity'

export const obraSchema = defineType({
  name: 'obra',
  title: 'Obra',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titulo' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'imagenes',
      title: 'Imágenes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'publicId', title: 'Cloudinary public_id', type: 'string' },
            { name: 'alt', title: 'Texto alternativo', type: 'string' },
          ],
          preview: {
            select: { title: 'alt', subtitle: 'publicId' },
          },
        },
      ],
    }),
    defineField({
      name: 'anio',
      title: 'Año',
      type: 'number',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'categoria' }],
    }),
    defineField({
      name: 'destacada',
      title: '¿Destacada?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'anio' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? String(subtitle) : '' }
    },
  },
})
