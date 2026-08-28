import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'showInNavbar'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name (e.g. कल्याण- डोंबिवली (KDMC), महत्वाचे)',
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
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'showInNavbar',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show in Header Navigation',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'badgeColor',
      type: 'text',
      defaultValue: '#cd0442',
      label: 'Badge Color (Hex)',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
