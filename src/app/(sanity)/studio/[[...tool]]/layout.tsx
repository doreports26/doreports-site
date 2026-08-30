import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Do Reports — Admin Studio',
  description: 'Do Reports CMS Admin Panel',
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: '100%', margin: 0, padding: 0 }}>
      <body style={{ height: '100%', margin: 0, padding: 0, overflow: 'hidden', background: '#0e1012' }}>
        {children}
      </body>
    </html>
  )
}
