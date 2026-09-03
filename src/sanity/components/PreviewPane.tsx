import React, { useState, useEffect, useRef } from 'react'
import type { SanityDocument } from 'sanity'

interface PreviewPaneProps {
  document: {
    displayed: SanityDocument & {
      slug?: {
        current?: string
      }
    }
    draft?: (SanityDocument & { slug?: { current?: string } }) | null
    published?: (SanityDocument & { slug?: { current?: string } }) | null
  }
}

type Device = 'desktop' | 'tablet' | 'mobile'

export function PreviewPane(props: PreviewPaneProps) {
  const { document } = props
  const { displayed, draft, published } = document
  const rawId = displayed?._id || ''
  const cleanId = rawId.replace(/^drafts\./, '')
  const slug = displayed?.slug?.current || cleanId || 'preview-draft'
  const isSlugGenerated = Boolean(displayed?.slug?.current)

  const isPublished = Boolean(published)
  const hasDraft = Boolean(draft)
  const isDraftOnly = hasDraft && !isPublished
  const isPublishedWithDraft = hasDraft && isPublished
  const isPublishedOnly = !hasDraft && isPublished

  const [device, setDevice] = useState<Device>('desktop')
  const [reloadKey, setReloadKey] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // URL that enables draft mode and redirects to the article page with inStudio flag
  const previewUrl = `/api/draft-mode/enable?slug=${encodeURIComponent(slug)}${cleanId ? `&id=${encodeURIComponent(cleanId)}` : ''}&preview=true&inStudio=true`
  const liveUrl = slug ? `/article/${encodeURIComponent(slug)}` : previewUrl

  // Send live draft updates to the iframe whenever any field in Sanity Studio changes
  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentWindow && displayed) {
      iframe.contentWindow.postMessage(
        {
          type: 'DOREPORTS_DRAFT_UPDATE',
          document: displayed,
        },
        '*'
      )
    }
  }, [displayed])

  // Listen for the iframe's handshake ready message and immediately send current form state
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'DOREPORTS_PREVIEW_READY') {
        const iframe = iframeRef.current
        if (iframe && iframe.contentWindow && displayed) {
          iframe.contentWindow.postMessage(
            {
              type: 'DOREPORTS_DRAFT_UPDATE',
              document: displayed,
            },
            '*'
          )
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [displayed])

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
        {/* Left: Device Switcher & Dynamic Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {isPublishedOnly && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: '#eff6ff',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe',
                borderRadius: '9999px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                }}
              />
              LIVE (Published)
            </span>
          )}

          {isPublishedWithDraft && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: '#fffbeb',
                color: '#b45309',
                border: '1px solid #fde68a',
                borderRadius: '9999px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                }}
              />
              DRAFT EDITS (Unpublished Changes)
            </span>
          )}

          {isDraftOnly && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                borderRadius: '9999px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              />
              LIVE PREVIEW (Draft)
            </span>
          )}

          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#64748b',
              marginLeft: '4px',
            }}
          >
            VIEWPORT:
          </span>

          <button
            type="button"
            onClick={() => setDevice('desktop')}
            style={{
              padding: '5px 10px',
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
              padding: '5px 10px',
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
              padding: '5px 10px',
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
              padding: '5px 10px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: '#f8fafc',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Refresh
          </button>

          {isPublished && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: '#0284c7',
                color: '#ffffff',
                borderRadius: '4px',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              🌐 Open Live Article
            </a>
          )}

          {hasDraft && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: '#cd0442',
                color: '#ffffff',
                borderRadius: '4px',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              ↗️ {isPublished ? 'Preview Draft Edits' : 'Open Draft Preview'}
            </a>
          )}
        </div>
      </div>

      {!isSlugGenerated && (
        <div
          style={{
            backgroundColor: '#fffbeb',
            borderBottom: '1px solid #fef3c7',
            padding: '6px 16px',
            fontSize: '12px',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>💡</span>
          <span>
            <strong>टीप (Tip):</strong> लेख शीर्षक प्रविष्ट करून Slug जनरेट करा. खालील प्रिव्ह्यू तुम्ही टाइप करताच आपोआप रिअल-टाइम अपडेट होईल.
          </span>
        </div>
      )}

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
            position: 'relative',
          }}
        >
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                zIndex: 10,
                fontSize: '13px',
                color: '#64748b',
                fontWeight: 500,
              }}
            >
              Loading preview...
            </div>
          )}
          <iframe
            ref={iframeRef}
            key={reloadKey}
            src={previewUrl}
            onLoad={() => {
              setIsLoading(false)
              if (iframeRef.current?.contentWindow && displayed) {
                iframeRef.current.contentWindow.postMessage(
                  {
                    type: 'DOREPORTS_DRAFT_UPDATE',
                    document: displayed,
                  },
                  '*'
                )
              }
            }}
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

