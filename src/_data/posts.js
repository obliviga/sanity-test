const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'ufao1yzo',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
})

const query = `*[_type == "post"]{
  title,
  "slug": slug.current,
  "authorName": author->name,
  "categoryTitles": categories[]->title,
  body
}`

module.exports = async function () {
  try {
    const posts = await client.fetch(query)
    return posts
  } catch (e) {
    console.error('Error fetching posts from Sanity:', e.message)
    return []
  }
}
