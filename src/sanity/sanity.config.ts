import { defineConfig } from 'sanity'
import { structureTool, type DefaultDocumentNodeResolver } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { PreviewPane } from './components/PreviewPane'
import { PreviewAction } from './actions/PreviewAction'

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'article' || schemaType === 'post') {
    return S.document().views([
      S.view.form().title('Content'),
      S.view.component(PreviewPane).title('Preview'),
    ])
  }
  return S.document().views([S.view.form()])
}

export default defineConfig({
  name: 'doreports',
  title: 'Do Reports — Admin Panel',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      defaultDocumentNode,
    }),
  ],
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'article' || context.schemaType === 'post') {
        return [...prev, PreviewAction]
      }
      return prev
    },
  },
  schema: {
    types: schemaTypes,
  },
})

