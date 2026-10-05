import { defineField, defineType } from 'sanity'

export const coleccionSchema = defineType({
  name: 'coleccion',
  title: 'Colección',
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
      rows: 3,
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen de portada',
      type: 'string',
      description: 'Cloudinary public_id',
    }),
  ],
  preview: {
    select: { title: 'nombre' },
  },
})
