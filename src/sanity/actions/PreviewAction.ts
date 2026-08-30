import { DocumentActionComponent, DocumentActionProps } from 'sanity'

export const PreviewAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const doc = (props.draft || props.published) as { slug?: { current?: string } } | null
  const slug = doc?.slug?.current

  return {
    label: 'Preview Draft',
    title: 'Open preview of this draft in a new tab',
    disabled: !slug,
    onHandle: () => {
      if (slug) {
        window.open(`/api/draft-mode/enable?slug=${encodeURIComponent(slug)}`, '_blank')
      }
    },
  }
}
