import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'section', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Headline / Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (URL parameter)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      defaultValue: 'top-stories',
      options: [
        { label: 'Top Stories (मुख्य बातम्या)', value: 'top-stories' },
        { label: 'Latest News (ताज्या घडामोडी)', value: 'latest-news' },
        { label: 'Politics (राजकारण / कल्याण-डोंबिवली)', value: 'politics' },
        { label: 'Important (महत्वाचे)', value: 'important' },
        { label: 'Special (विशेष)', value: 'special' },
        { label: 'Welfare (कल्याण)', value: 'welfare' },
        { label: 'Education (शिक्षण)', value: 'education' },
        { label: 'Sports (खेळ)', value: 'sports' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isMainStory',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature as Main Story on Homepage',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isBreaking',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mark as Breaking News / Live Ticker',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tag',
      type: 'text',
      label: 'Badge / Tag (e.g. Do Reports, म्हाडा, हवामान, Exclusive)',
      defaultValue: 'Do Reports',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'authorNameFallback',
      type: 'text',
      label: 'Author Name (fallback)',
      defaultValue: 'Sonal.K',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'External Image URL (Unsplash or CDN fallback)',
    },
    {
      name: 'mediaImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Uploaded Hero Image',
    },
    {
      name: 'snippet',
      type: 'textarea',
      label: 'Short Summary / Snippet',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Full Article Content (RichText)',
    },
    {
      name: 'rawContent',
      type: 'textarea',
      label: 'Plain / Multi-paragraph Content (Marathi)',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Article Tags (SEO & Keywords)',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
}
