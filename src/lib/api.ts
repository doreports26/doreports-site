import { client, getSanityClient, isSanityConfigured } from '@/sanity/client'
import { urlFor } from '@/sanity/image'

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
  if (!dateVal) return new Date().toLocaleDateString('mr-IN', { month: 'long', day: 'numeric', year: 'numeric' })
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
 * that the frontend components expect.
 */
function transformSanityDocToArticle(doc: any): ArticleItem {
  // Image: prefer Sanity image, fall back to external URL, then high quality placeholder
  let image = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1470&auto=format&fit=crop'
  if (doc.mainImage) {
    try {
      image = urlFor(doc.mainImage).width(1200).height(800).url()
    } catch {
      // ignore
    }
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
    bio: 'Do Reports न्यूज डेस्कवरील पत्रकार.',
  }

  if (doc.author) {
    authorName = doc.author.name || authorName
    let avatarUrl = null
    const authorImage = doc.author.image || doc.author.avatar
    if (authorImage) {
      try {
        avatarUrl = urlFor(authorImage).width(96).height(96).url()
      } catch {
        // ignore
      }
    }

    authorObj = {
      name: authorName,
      fullName: doc.author.fullName || authorName,
      role: doc.author.role || 'Special Correspondent | Do Reports',
      avatar: avatarUrl,
      avatarLetter: doc.author.avatarLetter || authorName.slice(0, 2).toUpperCase() || 'DR',
      verified: doc.author.verified ?? true,
      bio: doc.author.bio || 'Do Reports न्यूज डेस्कवरील पत्रकार.',
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
    tagsList = [doc.tag, 'Do Reports', 'महाराष्ट्र']
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
 * Fetch Main Feature Story from Sanity.
 * Prioritizes isMainStory == true, then most recent published article.
 */
export async function getMainStory(): Promise<ArticleItem | null> {
  if (isSanityConfigured) {
    try {
      const doc = await client.fetch(
        `*[_type in ["post", "article"] && isMainStory == true && (status == "published" || !defined(status))]
         | order(publishedAt desc)[0] ${articleProjection}`
      )

      if (doc) {
        return transformSanityDocToArticle(doc)
      }

      // If no article is explicitly marked as main story, take the most recent published article
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

  return null
}

/**
 * Fetch Top Stories List from Sanity.
 */
export async function getTopStories(limit = 4): Promise<ArticleItem[]> {
  if (isSanityConfigured) {
    try {
      // 1. Try section == "top-stories"
      const docs = await client.fetch(
        `*[_type in ["post", "article"] && section == "top-stories" && isMainStory != true && (status == "published" || !defined(status))]
         | order(publishedAt desc)[0...$limit] ${articleProjection}`,
        { limit }
      )

      if (docs && docs.length > 0) {
        return docs.map(transformSanityDocToArticle)
      }

      // 2. If no dedicated top-stories, return the most recent published articles
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

  return []
}

/**
 * Fetch Stories by Section (politics, important, welfare, sports, education, special, etc.)
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
      console.error(`Error fetching section [${section}] from Sanity:`, err)
    }
  }

  return []
}

/**
 * Fetch Single Article By Slug from Sanity (with decoding and case-insensitive fallback).
 * Supports draft mode to fetch unpublished articles or preview draft edits.
 */
export async function getArticleBySlug(
  slug: string,
  options?: { isDraftMode?: boolean }
): Promise<ArticleItem | null> {
  const decodedSlug = decodeURIComponent(slug)
  const isDraft = Boolean(options?.isDraftMode)
  const fetchClient = isDraft ? getSanityClient({ isDraftMode: true }) : client

  if (isSanityConfigured) {
    try {
      // 1. Exact match (prioritizing latest modified draft if draft mode is enabled)
      let doc = await fetchClient.fetch(
        `*[_type in ["post", "article"] && slug.current == $slug] | order(_updatedAt desc)[0] ${articleProjection}`,
        { slug: decodedSlug }
      )

      // 2. Case-insensitive fallback
      if (!doc) {
        doc = await fetchClient.fetch(
          `*[_type in ["post", "article"] && lower(slug.current) == lower($slug)] | order(_updatedAt desc)[0] ${articleProjection}`,
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

  return null
}

/**
 * Fetch Articles for a Category with Pagination from Sanity.
 */
export async function getArticlesByCategory(categorySlug: string, page = 1, limit = 10) {
  if (isSanityConfigured) {
    try {
      const start = (page - 1) * limit
      const end = start + limit

      const result = await client.fetch(
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

      if (result && result.docs) {
        return {
          docs: result.docs.map(transformSanityDocToArticle),
          totalDocs: result.total || 0,
          totalPages: Math.ceil((result.total || 0) / limit) || 1,
          page,
        }
      }
    } catch (err) {
      console.error(`Error fetching category [${categorySlug}] from Sanity:`, err)
    }
  }

  return {
    docs: [],
    totalDocs: 0,
    totalPages: 1,
    page,
  }
}

/**
 * Search Articles across title, snippet, rawContent, and tag from Sanity.
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

      if (result && result.docs) {
        return {
          docs: result.docs.map(transformSanityDocToArticle),
          totalDocs: result.total || 0,
          totalPages: Math.ceil((result.total || 0) / limit) || 1,
          page,
        }
      }
    } catch (err) {
      console.error('Error searching articles in Sanity:', err)
    }
  }

  return {
    docs: [],
    totalDocs: 0,
    totalPages: 1,
    page,
  }
}

/**
 * Fetch All Categories from Sanity.
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
