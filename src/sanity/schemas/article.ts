import { defineType, defineField } from 'sanity'
import { marathiSlugify } from '../slugUtils'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
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
      validation: (rule) => rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      initialValue: 3,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'views',
      title: 'Views Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'Short summary of the article shown on cards and under the headline',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),

    // Section & Homepage feature controls
    defineField({
      name: 'section',
      title: 'Section (बातमी विभाग)',
      type: 'string',
      options: {
        list: [
          { title: 'Top Stories (मुख्य बातम्या)', value: 'top-stories' },
          { title: 'Latest News (ताज्या घडामोडी)', value: 'latest-news' },
          { title: 'Politics (राजकारण / कल्याण-डोंबिवली)', value: 'politics' },
          { title: 'Jawhar-Palghar (जव्हार-पालघर)', value: 'jawhar-palghar' },
          { title: 'Important (महत्वाचे)', value: 'important' },
          { title: 'Special (विशेष)', value: 'special' },
          { title: 'Welfare (कल्याण)', value: 'welfare' },
          { title: 'Education (शिक्षण)', value: 'education' },
          { title: 'Entrepreneurship (उद्योजकता)', value: 'entrepreneurship' },
          { title: 'Sports (खेळ)', value: 'sports' },
        ],
      },
      initialValue: 'top-stories',
    }),
    defineField({
      name: 'isMainStory',
      title: 'Feature as Main Story on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBreaking',
      title: 'Mark as Breaking News / Ticker',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tag',
      title: 'Badge Tag (e.g. Do Reports, हवामान)',
      type: 'string',
      initialValue: 'Do Reports',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Keywords (SEO)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { author, publishedAt } = selection
      const dateFormatted = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft'
      return Object.assign({}, selection, {
        subtitle: author ? `by ${author} • ${dateFormatted}` : dateFormatted,
      })
    },
  },
})
