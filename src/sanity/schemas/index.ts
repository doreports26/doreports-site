import { post } from './post'
import { author } from './author'
import { category } from './category'

// Alias post as article for backwards compatibility with any existing URLs or references
export const article = { ...post, name: 'article', title: 'Article' }

export const schemaTypes = [post, article, author, category]
