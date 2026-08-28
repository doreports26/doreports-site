import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  mainStory,
  topStories,
  politicsStories,
  entertainmentStories,
  webStories,
  sportsStories,
} from '../lib/mockData'

async function seed() {
  console.log('🌱 Starting Payload CMS database seed...')

  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Create Default Admin User if not exists
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    console.log('👤 Creating default admin user (admin@doreports.com)...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@doreports.com',
        password: 'Password123!',
        name: 'News Desk Admin',
        roles: ['admin'],
      },
    })
    console.log('✅ Admin user created: email: admin@doreports.com / password: Password123!')
  }

  // 2. Create Default Author
  const existingAuthors = await payload.find({
    collection: 'authors',
    limit: 1,
  })

  let authorId: any = null
  if (existingAuthors.totalDocs === 0) {
    console.log('✍️ Creating default author: Sonal.K...')
    const author = await payload.create({
      collection: 'authors',
      data: {
        name: 'Sonal.K',
        fullName: 'Sonal Kothimbire',
        role: 'Special Correspondent',
        avatarLetter: 'DR',
        verified: true,
        bio: 'Senior journalist covering Maharashtra politics, KDMC developments, and state news.',
      },
    })
    authorId = author.id
  } else {
    authorId = existingAuthors.docs[0].id
  }

  // 3. Create Categories
  const defaultCategories = [
    { name: 'Latest News', slug: 'latest-news', order: 1 },
    { name: 'कल्याण- डोंबिवली (KDMC)', slug: 'kalyan-dombivli', order: 2 },
    { name: 'महत्वाचे', slug: 'important', order: 3 },
    { name: 'विशेष', slug: 'special', order: 4 },
    { name: 'Welfare', slug: 'welfare', order: 5 },
    { name: 'शिक्षण', slug: 'education', order: 6 },
  ]

  const categoryMap = new Map<string, string>()

  for (const cat of defaultCategories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      console.log(`📁 Creating category: ${cat.name} (${cat.slug})...`)
      const created = await payload.create({
        collection: 'categories',
        data: {
          name: cat.name,
          slug: cat.slug,
          order: cat.order,
          showInNavbar: true,
        },
      })
      categoryMap.set(cat.slug, String(created.id))
    } else {
      categoryMap.set(cat.slug, String(existing.docs[0].id))
    }
  }

  // 4. Seed Articles
  const articlesToSeed = [
    {
      ...mainStory,
      isMainStory: true,
      section: 'top-stories',
      categorySlug: 'latest-news',
    },
    ...topStories.map((s) => ({
      ...s,
      isMainStory: false,
      section: 'top-stories',
      categorySlug: 'latest-news',
    })),
    ...politicsStories.map((s) => ({
      ...s,
      isMainStory: false,
      section: 'politics',
      categorySlug: 'kalyan-dombivli',
    })),
    ...entertainmentStories.map((s) => ({
      ...s,
      isMainStory: false,
      section: 'important',
      categorySlug: 'important',
    })),
    ...webStories.map((s) => ({
      ...s,
      isMainStory: false,
      section: 'welfare',
      categorySlug: 'welfare',
    })),
    ...sportsStories.map((s) => ({
      ...s,
      isMainStory: false,
      section: 'education',
      categorySlug: 'education',
    })),
  ]

  for (const art of articlesToSeed) {
    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: art.slug } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      console.log(`📰 Inserting article: ${art.title.slice(0, 30)}...`)
      const catId = categoryMap.get((art as any).categorySlug)

      await payload.create({
        collection: 'articles',
        data: {
          title: art.title,
          slug: art.slug,
          status: 'published',
          publishedAt: new Date().toISOString(),
          section: (art as any).section as any,
          isMainStory: (art as any).isMainStory || false,
          tag: art.tag || 'Do Reports',
          author: authorId,
          authorNameFallback: art.author || 'Sonal.K',
          imageUrl: art.image,
          snippet: art.snippet || art.title,
          rawContent: art.content,
          category: catId || undefined,
          tags: [
            { tag: 'महाराष्ट्र' },
            { tag: 'बातम्या' },
            { tag: 'Do Reports' },
          ],
        },
      })
    }
  }

  console.log('🎉 Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
