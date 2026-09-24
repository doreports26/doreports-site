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
        slugify: (input: string) => marathiSlugify(input).toLowerCase(),
      },
      validation: (rule) =>
        rule.required().custom((s) =>
          s?.current && s.current !== s.current.toLowerCase() ? 'Slug must be lowercase' : true
        ),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (मेटा शीर्षक)',
      type: 'string',
      description: 'Custom SEO title for category page. Falls back to Title if empty.',
      validation: (rule) =>
        rule.custom((val) => {
          if (val && val.length > 60) {
            return 'Warning: SEO title longer than 60 characters may be truncated.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description (मेटा वर्णन)',
      type: 'text',
      rows: 3,
      description: 'Custom meta description for search results (~150 chars).',
      validation: (rule) =>
        rule.custom((val) => {
          if (val && val.length > 150) {
            return 'Warning: Meta description longer than 150 characters may be truncated.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'intro',
      title: 'Category Intro (प्रस्तावना)',
      type: 'text',
      rows: 3,
      description: '2–3 sentence intro paragraph shown on category page for hyperlocal rankings (KDMC, कल्याण, डोंबिवली, जव्हार, पालघर).',
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
