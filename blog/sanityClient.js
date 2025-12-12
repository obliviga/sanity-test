import {createClient} from 'https://cdn.skypack.dev/@sanity/client'

export const client = createClient({
  projectId: 'ufao1yzo',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2025-12-12', // use current date (YYYY-MM-DD) to target the latest API version
})
