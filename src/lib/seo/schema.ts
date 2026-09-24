import { SITE, abs } from './config'

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  '@id': abs('/#organization'),
  name: SITE.name,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: abs(SITE.logo) },
  sameAs: SITE.sameAs,
  areaServed: ['Kalyan-Dombivli', 'Jawhar', 'Palghar', 'Maharashtra'],
  // Add ONLY once these pages exist (Phase 2), never link to pages that 404:
  // publishingPrinciples: abs('/editorial-policy'),
  // correctionsPolicy: abs('/corrections-policy'),
  // contactPoint: { '@type': 'ContactPoint', contactType: 'editorial', email: '...', availableLanguage: ['mr', 'en'] },
})

// Site name for search results. No SearchAction: Google retired the sitelinks search box.
export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': abs('/#website'),
  url: SITE.url,
  name: SITE.name,
  inLanguage: 'mr',
  publisher: { '@id': abs('/#organization') },
})

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
})

// Person: the reporter, linked to the Organization via worksFor.
// `sameAs` here is the REPORTER'S OWN profiles (X, LinkedIn), never the organization's.
// Only add `url: abs('/author/<slug>')` after the /author/[slug] pages exist (Phase 2). Never link to a 404.
export const personSchema = (
  a: { name: string; slug?: string; jobTitle?: string; sameAs?: string[] },
  withContext = true,
) => ({
  ...(withContext ? { '@context': 'https://schema.org' } : {}),
  '@type': 'Person',
  '@id': a.slug ? abs(`/author/${a.slug}#person`) : abs('/#organization'),
  name: a.name,
  jobTitle: a.jobTitle,
  worksFor: { '@id': abs('/#organization') },
  sameAs: a.sameAs,
})

export const newsArticleSchema = (post: any, images: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  '@id': abs(`/article/${post.slug}#article`),
  mainEntityOfPage: { '@type': 'WebPage', '@id': abs(`/article/${post.slug}`) },
  headline: post.title,
  description: post.excerpt || post.snippet || post.title,
  image: images, // 3 crops: 1:1 (1200x1200), 4:3 (1200x900), 16:9 (1200x675)
  datePublished: post.publishedAt || post.date,
  dateModified: post._updatedAt ?? post.publishedAt ?? post.date,
  inLanguage: 'mr',
  isAccessibleForFree: true,
  articleSection: post.category?.title || post.category?.name,
  keywords: Array.isArray(post.tags) ? post.tags.join(', ') : undefined,
  // Real reporter -> Person. Desk item -> Organization.
  author: post.author?.slug
    ? personSchema(post.author, false)
    : { '@type': 'Organization', name: SITE.name, url: SITE.url },
  publisher: { '@id': abs('/#organization') },
})
