import { createClient } from 'https://cdn.skypack.dev/@sanity/client';

export const client = createClient({
  projectId: '3ljyhtiw',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});
