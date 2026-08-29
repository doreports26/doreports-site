import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Authors } from './collections/Authors'
import { Articles } from './collections/Articles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || (process.env.NODE_ENV === 'production' ? 'https://doreports.in' : 'http://localhost:3000')

export default buildConfig({
  serverURL: serverUrl,
  cors: [
    'https://doreports.in',
    'https://www.doreports.in',
    'http://localhost:3000',
    serverUrl,
  ].filter(Boolean),
  csrf: [
    'https://doreports.in',
    'https://www.doreports.in',
    'http://localhost:3000',
    serverUrl,
  ].filter(Boolean),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Authors, Articles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'payload-secret-doreports-secure-key-2026',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: (() => {
        // Strip sslmode from connection string — we handle SSL via the `ssl` config object below
        // This prevents Node.js 22+ SECURITY WARNING about SSL mode aliases
        const uri = process.env.DATABASE_URI || process.env.POSTGRES_URL || 'postgresql://postgres:postgres@127.0.0.1:5432/doreports'
        return uri.replace(/[?&]sslmode=[^&]*/gi, '').replace(/\?$/, '')
      })(),
      ssl: process.env.DATABASE_URI ? { rejectUnauthorized: false } : false,
      max: process.env.NODE_ENV === 'production' ? 3 : 10,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    },
  }),
})
