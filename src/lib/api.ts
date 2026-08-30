import { client, isSanityConfigured } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
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

/**
 * Transform a raw Sanity document into the ArticleItem shape
 * that the frontend components expect (identical interface).
 */
function transformSanityDocToArticle(doc: any): ArticleItem {
  // Image: prefer Sanity image, fall back to external URL, then placeholder
  let image = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop'
  if (doc.mainImage) {
    image = urlFor(doc.mainImage).width(1200).height(800).url()
  } else if (doc.imageUrl) {
    image = doc.imageUrl
  }

  // Author
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

  if (doc.author) {
    authorName = doc.author.name || authorName
    let avatarUrl = null
    const authorImage = doc.author.image || doc.author.avatar
    if (authorImage) {
      avatarUrl = urlFor(authorImage).width(96).height(96).url()
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

  // Category
  let categoryObj: CategoryItem | null = null
  if (doc.category) {
    categoryObj = {
      name: doc.category.title || doc.category.name || 'ताज्या घडामोडी',
      slug: doc.category.slug || 'latest-news',
      badgeColor: doc.category.badgeColor || '#cd0442',
    }
  }

  // Tags — Sanity stores as string[] directly
  let tagsList: string[] = []
  if (Array.isArray(doc.tags)) {
    tagsList = doc.tags.filter((t: any): t is string => typeof t === 'string' && t.trim().length > 0)
  }
  if (tagsList.length === 0 && doc.tag) {
    tagsList = [doc.tag, 'महाराष्ट्र', 'ताज्या घडामोडी']
  }

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    date: formatDate(doc.publishedAt),
    image,
    tag: doc.tag || 'Do Reports',
    tags: tagsList,
    author: authorName,
    authorDetails: authorObj,
    snippet: doc.excerpt || doc.snippet,
    content: doc.body || doc.content,
    rawContent: doc.rawContent,
    category: categoryObj,
    section: doc.section,
    highlight: doc.isBreaking,
    views: typeof doc.views === 'number' ? doc.views : 0,
  }
}

// ─── GROQ projection shared by all article/post queries ───────────────────────────
const articleProjection = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  tag,
  tags,
  section,
  isMainStory,
  isBreaking,
  "snippet": coalesce(excerpt, snippet),
  "excerpt": excerpt,
  rawContent,
  "content": coalesce(body, content),
  "body": body,
  imageUrl,
  mainImage,
  authorNameFallback,
  author->{name, fullName, role, image, avatar, avatarLetter, verified, bio},
  category->{title, name, "slug": slug.current, badgeColor},
  views,
}`

/**
 * Fetch Main Feature Story
 */
export async function getMainStory(): Promise<ArticleItem> {
  if (isSanityConfigured) {
    try {
      const doc = await client.fetch(
        `*[_type in ["post", "article"] && isMainStory == true && (status == "published" || !defined(status))]
         | order(publishedAt desc)[0] ${articleProjection}`
      )

      if (doc) {
        return transformSanityDocToArticle(doc)
      }

      // If no main story flagged, take most recent published article
      const fallbackDoc = await client.fetch(
        `*[_type in ["post", "article"] && (status == "published" || !defined(status))]
         | order(publishedAt desc)[0] ${articleProjection}`
      )

      if (fallbackDoc) {
        return transformSanityDocToArticle(fallbackDoc)
      }
    } catch (err) {
      console.error('Error fetching main story from Sanity:', err)
    }
  }

  return fallbackMainStory as ArticleItem
}

/**
 * Fetch Top Stories List
 */
export async function getTopStories(limit = 4): Promise<ArticleItem[]> {
  if (isSanityConfigured) {
    try {
      const docs = await client.fetch(
        `*[_type in ["post", "article"] && section == "top-stories" && isMainStory != true && (status == "published" || !defined(status))]
         | order(publishedAt desc)[0...$limit] ${articleProjection}`,
        { limit }
      )

      if (docs && docs.length > 0) {
        return docs.map(transformSanityDocToArticle)
      }

      // If no top-stories section flagged, fallback to recent posts
      const fallbackDocs = await client.fetch(
        `*[_type in ["post", "article"] && (status == "published" || !defined(status))]
         | order(publishedAt desc)[0...$limit] ${articleProjection}`,
        { limit }
      )

      if (fallbackDocs && fallbackDocs.length > 0) {
        return fallbackDocs.map(transformSanityDocToArticle)
      }
    } catch (err) {
      console.error('Error fetching top stories from Sanity:', err)
    }
  }

  return fallbackTopStories as ArticleItem[]
}

/**
 * Fetch Stories by Section (politics, entertainment, web/welfare, sports, special, etc.)
 */
export async function getStoriesBySection(section: string, limit = 4): Promise<ArticleItem[]> {
  if (isSanityConfigured) {
    try {
      const docs = await client.fetch(
        `*[_type in ["post", "article"] && (section == $section || category->slug.current == $section) && (status == "published" || !defined(status))]
         | order(publishedAt desc)[0...$limit] ${articleProjection}`,
        { section, limit }
      )

      if (docs && docs.length > 0) {
        return docs.map(transformSanityDocToArticle)
      }
    } catch (err) {
      console.error(`Error fetching section ${section} from Sanity:`, err)
    }
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
  // Decode percent-encoded URL slug (e.g. %20 → space)
  const decodedSlug = decodeURIComponent(slug)

  if (isSanityConfigured) {
    try {
      // 1. Exact match (fastest — handles properly slugified articles)
      let doc = await client.fetch(
        `*[_type in ["post", "article"] && slug.current == $slug][0] ${articleProjection}`,
        { slug: decodedSlug }
      )

      // 2. Case-insensitive fallback (handles "Sundays for Kalyan..." style slugs)
      if (!doc) {
        doc = await client.fetch(
          `*[_type in ["post", "article"] && lower(slug.current) == lower($slug)][0] ${articleProjection}`,
          { slug: decodedSlug }
        )
      }

      if (doc) {
        return transformSanityDocToArticle(doc)
      }
    } catch (err) {
      console.error(`Error fetching article [${decodedSlug}] from Sanity:`, err)
    }
  }

  const mock = fallbackGetArticleBySlug(slug)
  return mock as ArticleItem | undefined
}

/**
 * Fetch Articles for a Category with Pagination
 */
export async function getArticlesByCategory(categorySlug: string, page = 1, limit = 10) {
  if (isSanityConfigured) {
    try {
      const start = (page - 1) * limit
      const end = start + limit

      // Try matching by category reference slug first, then by section
      const docs = await client.fetch(
        `{
          "docs": *[_type in ["post", "article"] && (status == "published" || !defined(status)) && (
            category->slug.current == $categorySlug || section == $categorySlug
          )] | order(publishedAt desc)[$start...$end] ${articleProjection},
          "total": count(*[_type in ["post", "article"] && (status == "published" || !defined(status)) && (
            category->slug.current == $categorySlug || section == $categorySlug
          )])
        }`,
        { categorySlug, start, end }
      )

      if (docs.docs && docs.docs.length > 0) {
        return {
          docs: docs.docs.map(transformSanityDocToArticle),
          totalDocs: docs.total,
          totalPages: Math.ceil(docs.total / limit) || 1,
          page,
        }
      }
    } catch (err) {
      console.error(`Error fetching category [${categorySlug}] from Sanity:`, err)
    }
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

  if (isSanityConfigured) {
    try {
      const start = (page - 1) * limit
      const end = start + limit

      const result = await client.fetch(
        `{
          "docs": *[_type in ["post", "article"] && (status == "published" || !defined(status)) && (
            title match $q || excerpt match $q || snippet match $q || rawContent match $q || tag match $q
          )] | order(publishedAt desc)[$start...$end] ${articleProjection},
          "total": count(*[_type in ["post", "article"] && (status == "published" || !defined(status)) && (
            title match $q || excerpt match $q || snippet match $q || rawContent match $q || tag match $q
          )])
        }`,
        { q: `${trimmed}*`, start, end }
      )

      if (result.docs && result.docs.length > 0) {
        return {
          docs: result.docs.map(transformSanityDocToArticle),
          totalDocs: result.total,
          totalPages: Math.ceil(result.total / limit) || 1,
          page,
        }
      }
    } catch (err) {
      console.error('Error searching articles in Sanity:', err)
    }
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
  if (isSanityConfigured) {
    try {
      const docs = await client.fetch(
        `*[_type == "category"] | order(order asc) {
          _id,
          "name": coalesce(title, name),
          "title": coalesce(title, name),
          "slug": slug.current,
          order,
          showInNavbar,
          badgeColor,
        }`
      )

      if (docs && docs.length > 0) {
        return docs.map((c: any) => ({
          id: c._id,
          name: c.name,
          slug: c.slug,
          order: c.order,
          showInNavbar: c.showInNavbar,
          badgeColor: c.badgeColor,
        }))
      }
    } catch (err) {
      console.error('Error fetching categories from Sanity:', err)
    }
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
