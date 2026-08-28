import configPromise from '@payload-config'
import { getPayload as getPayloadInstance } from 'payload'

let cachedPayload: any = null
let isInitializing = false

export const getPayload = async () => {
  if (cachedPayload) {
    return cachedPayload
  }

  if (isInitializing) {
    return null
  }

  isInitializing = true
  try {
    const instance = await Promise.race([
      getPayloadInstance({
        config: configPromise,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Payload init timeout')), 2500)
      ),
    ])
    cachedPayload = instance
    return cachedPayload
  } catch {
    cachedPayload = null
    return null
  } finally {
    isInitializing = false
  }
}

