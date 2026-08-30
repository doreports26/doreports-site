'use client'

import { NextStudio } from 'next-sanity/studio'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import config from '@/sanity/sanity.config'

export default function StudioComponent() {
  return (
    <div style={{ height: '100vh', width: '100vw', maxHeight: '100dvh', overflow: 'hidden' }}>
      <StyleSheetManager
        shouldForwardProp={(propName, target) => {
          if (typeof target === 'string') {
            return isPropValid(propName)
          }
          return true
        }}
      >
        <NextStudio config={config} />
      </StyleSheetManager>
    </div>
  )
}
