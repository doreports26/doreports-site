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
  content?: unknown
  rawContent?: string
  category?: CategoryItem | null
  section?: string
  highlight?: boolean
  views?: number
}

export interface SanityAuthorDoc {
  name?: string
  fullName?: string
  role?: string
  image?: unknown
  avatar?: unknown
  avatarLetter?: string
  verified?: boolean
  bio?: string
}

export interface SanityCategoryDoc {
  title?: string
  name?: string
  slug?: string
  badgeColor?: string
}

export interface SanityArticleDoc {
  _id?: string
  slug?: string | { current?: string }
  title?: string
  publishedAt?: string
  mainImage?: unknown
  imageUrl?: string
  tag?: string
  tags?: string[]
  authorNameFallback?: string
  author?: SanityAuthorDoc
  category?: SanityCategoryDoc
  excerpt?: string
  snippet?: string
  body?: unknown
  content?: unknown
  rawContent?: string
  section?: string
  isBreaking?: boolean
  views?: number
  [key: string]: unknown
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
export function transformSanityDocToArticle(doc: SanityArticleDoc): ArticleItem {
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
    tagsList = (doc.tags as unknown[]).filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
  }
  if (tagsList.length === 0 && doc.tag) {
    tagsList = [doc.tag, 'Do Reports', 'महाराष्ट्र']
  }

  // Clean slug
  const rawSlug = typeof doc.slug === 'string' ? doc.slug : (doc.slug?.current || doc._id || '')
  const cleanSlug = rawSlug ? String(rawSlug).trim() : ''

  return {
    id: doc._id,
    slug: cleanSlug,
    title: doc.title || '',
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

// ─── Slug Aliases Mapping ────────────────────────────────────────────────────────
export const CATEGORY_SLUG_ALIASES: Record<string, string[]> = {
  'kalyan-dombivli': ['kalyan-dombivli', 'kdmc', 'kalyan', 'dombivli', 'politics'],
  'kdmc': ['kdmc', 'kalyan-dombivli', 'kalyan', 'dombivli', 'politics'],
  'jawhar-palghar': ['jawhar-palghar', 'jawhar', 'palghar', 'जव्हार-पालघर', 'जव्हार', 'पालघर'],
  'jawhar': ['jawhar', 'jawhar-palghar', 'palghar', 'जव्हार-पालघर', 'जव्हार'],
  'palghar': ['palghar', 'jawhar-palghar', 'jawhar', 'जव्हार-पालघर', 'पालघर'],
  'जव्हार-पालघर': ['जव्हार-पालघर', 'jawhar-palghar', 'jawhar', 'palghar', 'जव्हार', 'पालघर'],
  'important': ['important', 'trending', 'mahatvache', 'महत्वाचे'],
  'trending': ['trending', 'important', 'mahatvache', 'महत्वाचे'],
  'special': ['special', 'special-report', 'vishesh', 'विशेष'],
  'special-report': ['special-report', 'special', 'vishesh', 'विशेष'],
  'welfare': ['welfare', 'social', 'कल्याण'],
  'education': ['education', 'shikshan', 'शिक्षण', 'sports'],
  'entrepreneurship': ['entrepreneurship', 'udyojakta', 'business', 'उद्योजकता', 'उद्योग'],
  'udyojakta': ['udyojakta', 'entrepreneurship', 'business', 'उद्योजकता', 'उद्योग'],
  'business': ['business', 'entrepreneurship', 'udyojakta', 'उद्योजकता', 'उद्योग'],
  'उद्योजकता': ['उद्योजकता', 'entrepreneurship', 'udyojakta', 'business', 'उद्योग'],
  'उद्योग': ['उद्योग', 'उद्योजकता', 'entrepreneurship', 'udyojakta', 'business'],
  'latest-news': ['latest-news', 'latest', 'top-stories', 'all'],
}

export function resolveCategorySlugs(slug: string): string[] {
  const normalized = (slug || '').toLowerCase().trim()
  if (CATEGORY_SLUG_ALIASES[normalized]) {
    return CATEGORY_SLUG_ALIASES[normalized]
  }
  return [normalized, slug]
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
        `*[_type in ["post", "article"] && isMainStory == true && (status == "published" || !defined(status) || status == null)]
         | order(publishedAt desc)[0] ${articleProjection}`
      )

      if (doc) {
        return transformSanityDocToArticle(doc)
      }

      // If no article is explicitly marked as main story, take the most recent published article
      const fallbackDoc = await client.fetch(
        `*[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null)]
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
        `*[_type in ["post", "article"] && section == "top-stories" && isMainStory != true && (status == "published" || !defined(status) || status == null)]
         | order(publishedAt desc)[0...$limit] ${articleProjection}`,
        { limit }
      )

      if (docs && docs.length > 0) {
        return docs.map(transformSanityDocToArticle)
      }

      // 2. If no dedicated top-stories, return the most recent published articles
      const fallbackDocs = await client.fetch(
        `*[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null)]
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
 * Fetch Stories by Section / Category with flexible slug matching.
 */
export async function getStoriesBySection(section: string, limit = 4): Promise<ArticleItem[]> {
  if (isSanityConfigured) {
    try {
      const slugs = resolveCategorySlugs(section)
      const docs = await client.fetch(
        `*[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null) && (
          category->slug.current in $slugs ||
          section in $slugs ||
          lower(tag) in $slugs
        )] | order(publishedAt desc)[0...$limit] ${articleProjection}`,
        { slugs, limit }
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
 * Helper to build multiple variations of a slug so that articles can always be found
 * regardless of trailing spaces, spaces vs hyphens, uppercase/lowercase, Devanagari encoding, or IDs.
 */
export function getSlugCandidates(rawSlug: string): string[] {
  if (!rawSlug) return []
  const candidates = new Set<string>()

  // 1. Raw input and trims
  candidates.add(rawSlug)
  const trimmed = rawSlug.trim()
  if (trimmed) {
    candidates.add(trimmed)
    candidates.add(trimmed.toLowerCase())
    candidates.add(trimmed + ' ')
  }

  // 2. Decoded URI
  let decoded = rawSlug
  try {
    decoded = decodeURIComponent(rawSlug).trim()
  } catch {
    // fallback
  }

  if (decoded) {
    candidates.add(decoded)
    candidates.add(decoded.toLowerCase())
    candidates.add(decoded + ' ')

    // 3. Hyphenated variations
    const withHyphens = decoded.replace(/\s+/g, '-')
    candidates.add(withHyphens)
    candidates.add(withHyphens.toLowerCase())
    candidates.add(withHyphens + ' ')
    candidates.add(withHyphens.replace(/^-+|-+$/g, ''))
    candidates.add(withHyphens.replace(/^-+|-+$/g, '').toLowerCase())

    // 4. Space variations
    const withSpaces = decoded.replace(/-/g, ' ')
    candidates.add(withSpaces)
    candidates.add(withSpaces.toLowerCase())
    candidates.add(withSpaces + ' ')

    // 5. Unicode normalized (Devanagari matras)
    const normalized = decoded.normalize('NFC')
    candidates.add(normalized)
    candidates.add(normalized.toLowerCase())
    candidates.add(normalized + ' ')
  }

  return Array.from(candidates).filter(Boolean)
}

/**
 * Fetch Single Article By Slug from Sanity (with multi-candidate matching, ID fallback, and case-insensitive fallback).
 * Supports draft mode to fetch unpublished articles or preview draft edits.
 */
export async function getArticleBySlug(
  slug: string,
  options?: { isDraftMode?: boolean; documentId?: string }
): Promise<ArticleItem | null> {
  const isDraft = Boolean(options?.isDraftMode)
  const fetchClient = isDraft ? getSanityClient({ isDraftMode: true }) : client
  const docId = (options?.documentId || '').trim()
  const cleanDocId = docId.replace(/^drafts\./, '')
  const candidates = getSlugCandidates(slug)
  const idCandidates = cleanDocId
    ? [cleanDocId, `drafts.${cleanDocId}`, docId]
    : []

  if (isSanityConfigured) {
    try {
      // 1. If in draft mode and document ID is provided, query directly by ID / draft ID first
      if (isDraft && cleanDocId) {
        const idDoc = await fetchClient.fetch(
          `*[_type in ["post", "article"] && (_id in $idCandidates)] | order(_updatedAt desc)[0] ${articleProjection}`,
          { idCandidates }
        )
        if (idDoc) {
          return transformSanityDocToArticle(idDoc)
        }
      }

      // 2. Query by slug candidates or _id candidates
      let doc = await fetchClient.fetch(
        `*[_type in ["post", "article"] && (
          slug.current in $candidates || 
          lower(slug.current) in $candidates || 
          _id in $candidates || 
          "drafts." + _id in $candidates ||
          _id in $idCandidates
        )] | order(_updatedAt desc)[0] ${articleProjection}`,
        { candidates, idCandidates }
      )

      // 3. Fallback for prefix / partial match if slug had trailing characters or slight mismatch
      if (!doc) {
        const decoded = decodeURIComponent(slug).trim()
        const firstSegment = decoded.replace(/\s+/g, '-').split('-')[0]
        if (firstSegment && firstSegment.length >= 3) {
          doc = await fetchClient.fetch(
            `*[_type in ["post", "article"] && (
              slug.current match $pattern ||
              title match $pattern
            )] | order(_updatedAt desc)[0] ${articleProjection}`,
            { pattern: `*${firstSegment}*` }
          )
        }
      }

      if (doc) {
        return transformSanityDocToArticle(doc)
      }
    } catch (err) {
      console.error(`Error fetching article [${slug}] from Sanity:`, err)
    }
  }

  return null
}

/**
 * Fetch Category Details (title, badgeColor, description) from Sanity or defaults.
 */
export async function getCategoryDetails(slug: string): Promise<{ title: string; badgeColor?: string; description?: string } | null> {
  const defaultTitles: Record<string, string> = {
    "latest-news": "Latest News",
    "kalyan-dombivli": "कल्याण- डोंबिवली (KDMC)",
    "kdmc": "कल्याण- डोंबिवली (KDMC)",
    "jawhar-palghar": "जव्हार-पालघर",
    "jawhar": "जव्हार-पालघर",
    "palghar": "जव्हार-पालघर",
    "जव्हार-पालघर": "जव्हार-पालघर",
    "important": "महत्वाचे",
    "trending": "महत्वाचे",
    "special": "विशेष",
    "special-report": "विशेष",
    "welfare": "Welfare",
    "education": "शिक्षण",
    "entrepreneurship": "उद्योजकता",
    "udyojakta": "उद्योजकता",
    "business": "उद्योजकता",
    "उद्योजकता": "उद्योजकता",
    "उद्योग": "उद्योजकता",
  }

  if (isSanityConfigured) {
    try {
      const slugs = resolveCategorySlugs(slug)
      const doc = await client.fetch(
        `*[_type == "category" && slug.current in $slugs][0]{
          "title": coalesce(title, name),
          badgeColor,
          description
        }`,
        { slugs }
      )

      if (doc && doc.title) {
        return {
          title: doc.title.trim(),
          badgeColor: doc.badgeColor,
          description: doc.description,
        }
      }
    } catch (err) {
      console.error(`Error fetching category details for [${slug}]:`, err)
    }
  }

  const fallbackTitle = defaultTitles[slug] || defaultTitles[slug.toLowerCase()] || slug.replace(/-/g, ' ').toUpperCase()
  return {
    title: fallbackTitle,
  }
}

/**
 * Fetch Articles for a Category with Pagination from Sanity.
 * Supports all slug aliases (e.g. kalyan-dombivli & kdmc, important & trending, etc.)
 */
export async function getArticlesByCategory(categorySlug: string, page = 1, limit = 10) {
  if (isSanityConfigured) {
    try {
      const start = (page - 1) * limit
      const end = start + limit
      const normalized = categorySlug.toLowerCase().trim()

      // If requested slug is "latest-news", return all published articles in chronological order
      if (normalized === 'latest-news' || normalized === 'latest' || normalized === 'all') {
        const result = await client.fetch(
          `{
            "docs": *[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null)]
              | order(publishedAt desc)[$start...$end] ${articleProjection},
            "total": count(*[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null)])
          }`,
          { start, end }
        )

        if (result && result.docs) {
          return {
            docs: result.docs.map(transformSanityDocToArticle),
            totalDocs: result.total || 0,
            totalPages: Math.ceil((result.total || 0) / limit) || 1,
            page,
          }
        }
      }

      // For specific category, match against all related aliases
      const slugs = resolveCategorySlugs(categorySlug)

      const result = await client.fetch(
        `{
          "docs": *[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null) && (
            category->slug.current in $slugs ||
            section in $slugs ||
            lower(tag) in $slugs
          )] | order(publishedAt desc)[$start...$end] ${articleProjection},
          "total": count(*[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null) && (
            category->slug.current in $slugs ||
            section in $slugs ||
            lower(tag) in $slugs
          )])
        }`,
        { slugs, start, end }
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
          "docs": *[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null) && (
            title match $q || excerpt match $q || snippet match $q || rawContent match $q || tag match $q
          )] | order(publishedAt desc)[$start...$end] ${articleProjection},
          "total": count(*[_type in ["post", "article"] && (status == "published" || !defined(status) || status == null) && (
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
        return docs.map((c: { _id?: string; name?: string; slug?: string; order?: number; showInNavbar?: boolean; badgeColor?: string }) => ({
          id: c._id,
          name: c.name?.trim(),
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
    { name: "जव्हार-पालघर", slug: "jawhar-palghar", order: 3, showInNavbar: true },
    { name: "महत्वाचे", slug: "important", order: 4, showInNavbar: true },
    { name: "विशेष", slug: "special", order: 5, showInNavbar: true },
    { name: "Welfare", slug: "welfare", order: 6, showInNavbar: true },
    { name: "शिक्षण", slug: "education", order: 7, showInNavbar: true },
    { name: "उद्योजकता", slug: "entrepreneurship", order: 8, showInNavbar: true },
  ]
}
