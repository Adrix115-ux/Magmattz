import { defineField, defineType } from 'sanity'

export const varianteSchema = defineType({
  name: 'variante',
  title: 'Variante',
  type: 'object',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: A6, 10x10cm, Pack x5',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio (Bs)',
      type: 'number',
    }),
    defineField({
      name: 'disponible',
      title: '¿Disponible?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'precio' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `Bs ${subtitle}` : 'Sin precio' }
    },
  },
})
