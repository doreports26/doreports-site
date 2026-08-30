'use client'

import dynamic from 'next/dynamic'

export const dynamicParams = true

const Studio = dynamic(() => import('./Studio'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#101112',
        color: '#ffffff',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: 8, fontSize: 20, fontWeight: 600 }}>Loading Do Reports Studio...</h2>
        <p style={{ color: '#8f94a0', fontSize: 14 }}>Connecting to Sanity...</p>
      </div>
    </div>
  ),
})

export default function StudioPage() {
  return <Studio />
}
