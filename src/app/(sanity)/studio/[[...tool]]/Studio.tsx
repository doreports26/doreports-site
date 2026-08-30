'use client'

import { Studio } from 'sanity'
import config from '@/sanity/sanity.config'

export default function StudioComponent() {
  return (
    <div style={{ height: '100vh', width: '100vw', maxHeight: '100dvh', overflow: 'hidden' }}>
      <Studio config={config} />
    </div>
  )
}
