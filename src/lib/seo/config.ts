// src/lib/seo/config.ts
export const SITE = {
  // Decision: canonical host. Default www. Before shipping, run Search Console URL Inspection on 3-4
  // article URLs on BOTH hosts and read "Google-selected canonical". If Google has chosen the apex
  // (doreports.in), change ONLY this fallback and the Vercel redirect direction.
  // (A URL-prefix property's Performance report only shows that one prefix, so it can't answer this.
  // Use a Domain property or URL Inspection.)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.doreports.in').replace(/\/$/, ''),
  name: 'Do Reports',
  lang: 'mr',
  locale: 'mr_IN',
  twitter: '@doreports26',
  logo: '/do-reports-logo.png',
  sameAs: [
    'https://x.com/doreports26',
    'https://www.instagram.com/doreportsnews',        // strip utm/igsi params
    'https://www.youtube.com/@doreports-i1z',
    'https://whatsapp.com/channel/0029Va9W8X69hXFBzBvM2O3k',
  ],
}

export const abs = (path = '/') => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
