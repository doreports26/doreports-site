import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN

if (!token) {
  console.error('ERROR: SANITY_WRITE_TOKEN is not defined in environment.')
  console.error('Please run with SANITY_WRITE_TOKEN: npx tsx scripts/lowercase-slugs.ts')
  process.exit(1)
}

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9w6rwixs',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
})

async function run() {
  const docs = await c.fetch<{ _id: string; _type: string; s: string }[]>(
    `*[_type in ["article", "post", "category"] && defined(slug.current)]{ _id, _type, "s": slug.current }`
  )

  const nonLowercase = docs.filter((d) => d.s !== d.s.toLowerCase())
  console.log(`Found ${nonLowercase.length} documents with non-lowercase slugs out of ${docs.length} total.`)

  for (const d of nonLowercase) {
    const lower = d.s.toLowerCase()
    await c.patch(d._id).set({ 'slug.current': lower }).commit()
    console.log(`Lowercased [${d._type}] ${d._id}: "${d.s}" -> "${lower}"`)
  }

  console.log('Migration complete.')
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
