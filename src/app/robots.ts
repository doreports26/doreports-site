import type { MetadataRoute } from 'next'
import { abs } from '@/lib/seo/config'

// AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, ...) are intentionally
// NOT listed. With no bot-specific rule they fall under the "*" group below and are allowed.
// Why: for a small hyperlocal publisher, being crawled, cited and linked in AI answers is free reach.
// Do not add per-bot rules "just in case".
// Note: Google-Extended only controls use of content for Gemini training/grounding. It has no effect
// on Google Search indexing or ranking. Google's AI features in Search follow the normal Search
// controls (Googlebot, snippet directives), not Google-Extended.
// Reference: https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do NOT block /_next/ — Google needs JS/CSS to render pages.
        disallow: ['/api/', '/studio', '/admin', '/preview', '/search'],
      },
    ],
    sitemap: [abs('/sitemap.xml'), abs('/news-sitemap.xml')],
  }
}
