import React, { useState } from 'react'
import type { SanityDocument } from 'sanity'

interface PreviewPaneProps {
  document: {
    displayed: SanityDocument & {
      slug?: {
        current?: string
      }
    }
  }
}

type Device = 'desktop' | 'tablet' | 'mobile'

export function PreviewPane(props: PreviewPaneProps) {
  const { document } = props
  const { displayed } = document
  const slug = displayed?.slug?.current
  const [device, setDevice] = useState<Device>('desktop')
  const [reloadKey, setReloadKey] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  if (!slug) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>
          No Slug Provided Yet
        </div>
        <p style={{ color: '#666', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
          Please enter an article title and generate or set a slug to preview this article before publishing.
        </p>
      </div>
    )
  }

  // The draft mode enable URL automatically activates draft mode in Next.js and loads the article
  const previewUrl = `/api/draft-mode/enable?slug=${encodeURIComponent(slug)}`

  const getWidth = () => {
    switch (device) {
      case 'mobile':
        return '390px'
      case 'tablet':
        return '768px'
      case 'desktop':
      default:
        return '100%'
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#f1f3f5',
        overflow: 'hidden',
      }}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '8px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        {/* Left: Device Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginRight: '4px' }}>
            VIEWPORT:
          </span>
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: device === 'desktop' ? 700 : 500,
              backgroundColor: device === 'desktop' ? '#090909' : '#f8fafc',
              color: device === 'desktop' ? '#ffffff' : '#334155',
              border: '1px solid',
              borderColor: device === 'desktop' ? '#090909' : '#cbd5e1',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            🖥️ Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: device === 'tablet' ? 700 : 500,
              backgroundColor: device === 'tablet' ? '#090909' : '#f8fafc',
              color: device === 'tablet' ? '#ffffff' : '#334155',
              border: '1px solid',
              borderColor: device === 'tablet' ? '#090909' : '#cbd5e1',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            📱 Tablet (768px)
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: device === 'mobile' ? 700 : 500,
              backgroundColor: device === 'mobile' ? '#090909' : '#f8fafc',
              color: device === 'mobile' ? '#ffffff' : '#334155',
              border: '1px solid',
              borderColor: device === 'mobile' ? '#090909' : '#cbd5e1',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            📲 Mobile (390px)
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true)
              setReloadKey((prev) => prev + 1)
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: '#f8fafc',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Refresh Preview
          </button>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: '#cd0442',
              color: '#ffffff',
              borderRadius: '4px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ↗️ Open Live in New Tab
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: device === 'desktop' ? '0' : '16px',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: getWidth(),
            height: '100%',
            backgroundColor: '#ffffff',
            borderRadius: device === 'desktop' ? '0' : '12px',
            boxShadow:
              device === 'desktop'
                ? 'none'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            border: device === 'desktop' ? 'none' : '2px solid #cbd5e1',
          }}
        >
          <iframe
            key={reloadKey}
            src={previewUrl}
            onLoad={() => setIsLoading(false)}
            title="Article Live Preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              flex: 1,
              backgroundColor: '#ffffff',
            }}
          />
        </div>
      </div>
    </div>
  )
}
