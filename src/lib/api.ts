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

export interface ArticleItem {
  id?: string | number
  slug: string
  title: string
  date: string
  image: string
  tag?: string
  author?: string
  snippet?: string
  content?: any
  rawContent?: string
  category?: {
    name: string
    slug: string
  } | null
  section?: string
  highlight?: boolean
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

  let author = doc.authorNameFallback || 'Sonal.K'
  if (doc.author && typeof doc.author === 'object' && doc.author.name) {
    author = doc.author.name
  }

  let categoryObj = null
  if (doc.category && typeof doc.category === 'object') {
    categoryObj = {
      name: doc.category.name,
      slug: doc.category.slug,
    }
  }

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    date: formatDate(doc.publishedAt || doc.createdAt),
    image,
    tag: doc.tag || 'Do Reports',
    author,
    snippet: doc.snippet,
    content: doc.content,
    rawContent: doc.rawContent,
    category: categoryObj,
    section: doc.section,
    highlight: doc.isBreaking,
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
