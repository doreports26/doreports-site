'use client'

import Link from 'next/link'
import { Eye, ExternalLink, X, Edit3 } from 'lucide-react'

interface DraftModeBarProps {
  slug?: string
}

export function DraftModeBar({ slug }: DraftModeBarProps) {
  const disableUrl = slug
    ? `/api/draft-mode/disable?slug=${encodeURIComponent(slug)}`
    : '/api/draft-mode/disable'

  return (
    <aside
      aria-label="Draft preview toolbar"
      className="sticky top-0 z-[9999] w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md border-b border-amber-500/40 px-4 py-2 text-xs sm:text-sm font-medium"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <div className="flex items-center gap-1.5 font-semibold">
            <Eye className="w-4 h-4" />
            <span>DRAFT PREVIEW MODE</span>
          </div>
          <span className="hidden md:inline-block text-amber-100 text-xs font-normal">
            (Viewing live unpublished draft changes)
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/studio"
            className="inline-flex items-center gap-1 bg-black/30 hover:bg-black/50 text-white px-2.5 py-1 rounded transition-colors text-xs font-semibold backdrop-blur-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Studio</span>
          </Link>
          <a
            href={disableUrl}
            className="inline-flex items-center gap-1 bg-white hover:bg-amber-50 text-gray-900 font-bold px-3 py-1 rounded shadow-sm transition-colors text-xs"
          >
            <X className="w-3.5 h-3.5 text-gray-700" />
            <span>Exit Preview</span>
          </a>
        </div>
      </div>
    </aside>
  )
}
