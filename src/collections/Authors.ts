import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'fullName', 'role', 'verified'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Short / Display Name (e.g. Sonal.K)',
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name (e.g. Sonal Kothimbire)',
    },
    {
      name: 'role',
      type: 'text',
      defaultValue: 'Reporter / Desk',
      label: 'Role / Designation',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Avatar Image',
    },
    {
      name: 'avatarLetter',
      type: 'text',
      defaultValue: 'DR',
      label: 'Fallback Logo / Initial Letter (e.g. DR)',
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: true,
      label: 'Verified Badge',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Author Bio',
    },
  ],
}
