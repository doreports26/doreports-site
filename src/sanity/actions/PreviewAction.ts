import { DocumentActionComponent, DocumentActionProps } from 'sanity'

export const PreviewAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const doc = (props.draft || props.published) as { _id?: string; slug?: { current?: string } } | null
  const slug = doc?.slug?.current
  const id = props.id || doc?._id?.replace(/^drafts\./, '')
  const target = slug || id

  const isPublished = Boolean(props.published)
  const hasDraft = Boolean(props.draft)

  // Determine dynamic label and title based on publishing status
  let label = 'Preview Draft'
  let title = 'Open preview of this draft before publishing'

  if (isPublished && !hasDraft) {
    label = 'View Live Article'
    title = 'Open this published article on the live website'
  } else if (isPublished && hasDraft) {
    label = 'Preview Draft Edits'
    title = 'Preview your unpublished changes before re-publishing'
  }

  return {
    label,
    title,
    disabled: !target,
    onHandle: () => {
      if (target) {
        let url = `/api/draft-mode/enable?slug=${encodeURIComponent(target)}${id ? `&id=${encodeURIComponent(id)}` : ''}&preview=true`

        // If it's already published without draft edits, open the live URL directly
        if (isPublished && !hasDraft && slug) {
          url = `/article/${encodeURIComponent(slug)}`
        }

        window.open(url, '_blank')
      }
    },
  }
}

