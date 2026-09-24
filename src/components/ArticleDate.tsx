// src/components/ArticleDate.tsx (Server Component: no 'use client', so no hydration mismatch)
const fmtCache = new Map<string, Intl.DateTimeFormat>()

function getFmt(locale: string, withTime: boolean) {
  const key = `${locale}|${withTime}`
  if (!fmtCache.has(key)) {
    fmtCache.set(
      key,
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'long',
        ...(withTime ? { timeStyle: 'short' } : {}),
        timeZone: 'Asia/Kolkata',
      }),
    )
  }
  return fmtCache.get(key)!
}

export function ArticleDate({
  iso,
  locale = 'en-US',
  withTime = false,
  className,
}: {
  iso: string
  locale?: string
  withTime?: boolean
  className?: string
}) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return (
    <time dateTime={d.toISOString()} className={className}>
      {getFmt(locale, withTime).format(d)}
    </time>
  )
}
