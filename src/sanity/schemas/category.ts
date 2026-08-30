import { defineType, defineField } from 'sanity'
import { marathiSlugify } from '../slugUtils'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: string) => marathiSlugify(input),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'showInNavbar',
      title: 'Show in Header Navigation',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badgeColor',
      title: 'Badge Color (Hex)',
      type: 'string',
      initialValue: '#cd0442',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
