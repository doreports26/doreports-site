import { getPayload } from './payload'
import {
  Article as MockArticle,
  mainStory as fallbackMainStory,
  topStories as fallbackTopStories,
  politicsStories as fallbackPoliticsStories,
  entertainmentStories as fallbackEntertainmentStories,
  webStories as fallbackWebStories,
  sportsStories as fallbackSportsStories,
  getArticleBySlug as fallbackGetArticleBySlug,
} from './mockData'

export interface AuthorItem {
  name: string
  fullName?: string
  role?: string
  avatar?: string | null
  avatarLetter?: string
  verified?: boolean
  bio?: string
}

export interface CategoryItem {
  name: string
  slug: string
  badgeColor?: string
}

export interface ArticleItem {
  id?: string | number
  slug: string
  title: string
  date: string
  image: string
  tag?: string
  tags?: string[]
  author?: string
  authorDetails?: AuthorItem
  snippet?: string
  content?: any
  rawContent?: string
  category?: CategoryItem | null
  section?: string
  highlight?: boolean
  views?: number
}

function formatDate(dateVal?: string | Date): string {
  if (!dateVal) return 'August 26, 2026'
  try {
    const d = new Date(dateVal)
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return String(dateVal)
  }
}

function transformPayloadDocToArticle(doc: any): ArticleItem {
  let image = doc.imageUrl || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop'
  if (doc.mediaImage && typeof doc.mediaImage === 'object' && doc.mediaImage.url) {
    image = doc.mediaImage.url
  }

  let authorName = doc.authorNameFallback || 'Do Reports Desk'
  let authorObj: AuthorItem = {
    name: authorName,
    fullName: authorName,
    role: 'Special Correspondent | Do Reports',
    avatar: null,
    avatarLetter: 'DR',
    verified: true,
    bio: 'Special Correspondent | Do Reports',
  }

  if (doc.author && typeof doc.author === 'object') {
    authorName = doc.author.name || authorName
    let avatarUrl = null
    if (doc.author.avatar && typeof doc.author.avatar === 'object' && doc.author.avatar.url) {
      avatarUrl = doc.author.avatar.url
    }

    authorObj = {
      name: authorName,
      fullName: doc.author.fullName || authorName,
      role: doc.author.role || 'Special Correspondent | Do Reports',
      avatar: avatarUrl,
      avatarLetter: doc.author.avatarLetter || authorName.slice(0, 2).toUpperCase() || 'DR',
      verified: doc.author.verified ?? true,
      bio: doc.author.bio || 'Special Correspondent | Do Reports',
    }
  }

  let categoryObj: CategoryItem | null = null
  if (doc.category && typeof doc.category === 'object') {
    categoryObj = {
      name: doc.category.name,
      slug: doc.category.slug,
      badgeColor: doc.category.badgeColor || '#cd0442',
    }
  }

  let tagsList: string[] = []
  if (Array.isArray(doc.tags)) {
    tagsList = doc.tags
      .map((t: any) => (typeof t === 'string' ? t : t?.tag))
      .filter((t: any): t is string => typeof t === 'string' && t.trim().length > 0)
  }
  if (tagsList.length === 0 && doc.tag) {
    tagsList = [doc.tag, 'महाराष्ट्र', 'ताज्या घडामोडी']
  }

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    date: formatDate(doc.publishedAt || doc.createdAt),
    image,
    tag: doc.tag || 'Do Reports',
    tags: tagsList,
    author: authorName,
    authorDetails: authorObj,
    snippet: doc.snippet,
    content: doc.content,
    rawContent: doc.rawContent,
    category: categoryObj,
    section: doc.section,
    highlight: doc.isBreaking,
    views: typeof doc.views === 'number' ? doc.views : 0,
  }
}

/**
 * Fetch Main Feature Story
 */
export async function getMainStory(): Promise<ArticleItem> {
  try {
    const payload = await getPayload()
    if (payload) {
      const result = await payload.find({
        collection: 'articles',
        where: {
          and: [
            { isMainStory: { equals: true } },
            { status: { equals: 'published' } },
          ],
        },
        limit: 1,
        sort: '-publishedAt',
      })

      if (result.docs.length > 0) {
        return transformPayloadDocToArticle(result.docs[0])
      }

      // If no main story flagged, take most recent published article
      const fallbackResult = await payload.find({
        collection: 'articles',
        where: {
          status: { equals: 'published' },
        },
        limit: 1,
        sort: '-publishedAt',
      })

      if (fallbackResult.docs.length > 0) {
        return transformPayloadDocToArticle(fallbackResult.docs[0])
      }
    }
  } catch (err) {
    console.error('Error fetching main story from Payload:', err)
  }

  return fallbackMainStory as ArticleItem
}

/**
 * Fetch Top Stories List
 */
export async function getTopStories(limit = 4): Promise<ArticleItem[]> {
  try {
    const payload = await getPayload()
    if (payload) {
      const result = await payload.find({
        collection: 'articles',
        where: {
          and: [
            { section: { equals: 'top-stories' } },
            { isMainStory: { not_equals: true } },
            { status: { equals: 'published' } },
          ],
        },
        limit,
        sort: '-publishedAt',
      })

      if (result.docs.length > 0) {
        return result.docs.map(transformPayloadDocToArticle)
      }
    }
  } catch (err) {
    console.error('Error fetching top stories from Payload:', err)
  }

  return fallbackTopStories as ArticleItem[]
}

/**
 * Fetch Stories by Section (politics, entertainment, web/welfare, sports, special, etc.)
 */
export async function getStoriesBySection(section: string, limit = 4): Promise<ArticleItem[]> {
  try {
    const payload = await getPayload()
    if (payload) {
      const result = await payload.find({
        collection: 'articles',
        where: {
          and: [
            { section: { equals: section } },
            { status: { equals: 'published' } },
          ],
        },
        limit,
        sort: '-publishedAt',
      })

      if (result.docs.length > 0) {
        return result.docs.map(transformPayloadDocToArticle)
      }
    }
  } catch (err) {
    console.error(`Error fetching section ${section} from Payload:`, err)
  }

  // Fallback mappings
  switch (section) {
    case 'politics':
      return fallbackPoliticsStories as ArticleItem[]
    case 'entertainment':
    case 'important':
      return fallbackEntertainmentStories as ArticleItem[]
    case 'welfare':
      return fallbackWebStories as ArticleItem[]
    case 'sports':
    case 'education':
      return fallbackSportsStories as ArticleItem[]
    case 'special':
      return [fallbackMainStory, ...fallbackTopStories.slice(0, 3)] as ArticleItem[]
    default:
      return fallbackTopStories as ArticleItem[]
  }
}

/**
 * Fetch Single Article By Slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleItem | undefined> {
  try {
    const payload = await getPayload()
    if (payload) {
      const result = await payload.find({
        collection: 'articles',
        where: {
          slug: { equals: slug },
        },
        limit: 1,
      })

      if (result.docs.length > 0) {
        return transformPayloadDocToArticle(result.docs[0])
      }
    }
  } catch (err) {
    console.error(`Error fetching article [${slug}] from Payload:`, err)
  }

  const mock = fallbackGetArticleBySlug(slug)
  return mock as ArticleItem | undefined
}

/**
 * Fetch Articles for a Category with Pagination
 */
export async function getArticlesByCategory(categorySlug: string, page = 1, limit = 10) {
  try {
    const payload = await getPayload()
    if (payload) {
      // Find category ID first
      const catRes = await payload.find({
        collection: 'categories',
        where: {
          slug: { equals: categorySlug },
        },
        limit: 1,
      })

      const whereClause: any = {
        status: { equals: 'published' },
      }

      if (catRes.docs.length > 0) {
        whereClause.category = { equals: catRes.docs[0].id }
      } else {
        // Match section slug as fallback
        whereClause.section = { equals: categorySlug }
      }

      const result = await payload.find({
        collection: 'articles',
        where: whereClause,
        page,
        limit,
        sort: '-publishedAt',
      })

      if (result.docs.length > 0) {
        return {
          docs: result.docs.map(transformPayloadDocToArticle),
          totalDocs: result.totalDocs,
          totalPages: result.totalPages,
          page: result.page,
        }
      }
    }
  } catch (err) {
    console.error(`Error fetching category [${categorySlug}] from Payload:`, err)
  }

  // Mock data fallback for category
  const allArticles = [
    fallbackMainStory,
    ...fallbackTopStories,
    ...fallbackPoliticsStories,
    ...fallbackEntertainmentStories,
    ...fallbackWebStories,
    ...fallbackSportsStories,
  ] as ArticleItem[]

  return {
    docs: allArticles.slice((page - 1) * limit, page * limit),
    totalDocs: allArticles.length,
    totalPages: Math.ceil(allArticles.length / limit) || 1,
    page,
  }
}

/**
 * Search Articles across title, snippet, rawContent, and tag
 */
export async function searchArticles(query: string, page = 1, limit = 10) {
  const trimmed = query?.trim() || ''
  if (!trimmed) {
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 1,
      page: 1,
    }
  }

  try {
    const payload = await getPayload()
    if (payload) {
      const result = await payload.find({
        collection: 'articles',
        where: {
          and: [
            { status: { equals: 'published' } },
            {
              or: [
                { title: { like: trimmed } },
                { snippet: { like: trimmed } },
                { rawContent: { like: trimmed } },
                { tag: { like: trimmed } },
              ],
            },
          ],
        },
        page,
        limit,
        sort: '-publishedAt',
      })

      if (result.docs.length > 0) {
        return {
          docs: result.docs.map(transformPayloadDocToArticle),
          totalDocs: result.totalDocs,
          totalPages: result.totalPages,
          page: result.page,
        }
      }
    }
  } catch (err) {
    console.error('Error searching articles in Payload:', err)
  }

  // Fallback search in mock data
  const allArticles = [
    fallbackMainStory,
    ...fallbackTopStories,
    ...fallbackPoliticsStories,
    ...fallbackEntertainmentStories,
    ...fallbackWebStories,
    ...fallbackSportsStories,
  ] as ArticleItem[]

  const qLower = trimmed.toLowerCase()
  const matched = allArticles.filter((item) => {
    return (
      item.title?.toLowerCase().includes(qLower) ||
      item.snippet?.toLowerCase().includes(qLower) ||
      item.tag?.toLowerCase().includes(qLower) ||
      item.rawContent?.toLowerCase().includes(qLower)
    )
  })

  return {
    docs: matched.slice((page - 1) * limit, page * limit),
    totalDocs: matched.length,
    totalPages: Math.ceil(matched.length / limit) || 1,
    page,
  }
}

/**
 * Fetch All Categories
 */
export async function getCategories() {
  try {
    const payload = await getPayload()
    if (payload) {
      const result = await payload.find({
        collection: 'categories',
        sort: 'order',
        limit: 50,
      })

      if (result.docs.length > 0) {
        return result.docs.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          order: c.order,
          showInNavbar: c.showInNavbar,
          badgeColor: c.badgeColor,
        }))
      }
    }
  } catch (err) {
    console.error('Error fetching categories from Payload:', err)
  }

  return [
    { name: "Latest News", slug: "latest-news", order: 1, showInNavbar: true },
    { name: "कल्याण- डोंबिवली (KDMC)", slug: "kalyan-dombivli", order: 2, showInNavbar: true },
    { name: "महत्वाचे", slug: "important", order: 3, showInNavbar: true },
    { name: "विशेष", slug: "special", order: 4, showInNavbar: true },
    { name: "Welfare", slug: "welfare", order: 5, showInNavbar: true },
    { name: "शिक्षण", slug: "education", order: 6, showInNavbar: true },
  ]
}
