import { defineField, defineType } from 'sanity'

export const productoSchema = defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nombre' },
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
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Sticker', value: 'sticker' },
          { title: 'Llavero', value: 'llavero' },
          { title: 'Pin', value: 'pin' },
          { title: 'Otro', value: 'otro' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio base (Bs)',
      type: 'number',
      description: 'Opcional, puede definirse por variante',
    }),
    defineField({
      name: 'disponible',
      title: '¿Disponible?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'destacado',
      title: '¿Destacado en inicio?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'obraRelacionada',
      title: 'Obra relacionada',
      type: 'reference',
      to: [{ type: 'obra' }],
    }),
    defineField({
      name: 'coleccion',
      title: 'Colección',
      type: 'reference',
      to: [{ type: 'coleccion' }],
    }),
    defineField({
      name: 'variantes',
      title: 'Variantes',
      type: 'array',
      of: [{ type: 'variante' }],
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'tipo',
      disponible: 'disponible',
    },
    prepare({ title, subtitle, disponible }) {
      return {
        title,
        subtitle: `${subtitle ?? ''}${disponible === false ? ' · No disponible' : ''}`,
      }
    },
  },
})
