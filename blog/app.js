import { client } from './sanityClient.js';

async function getPosts() {
  const query = await fetch('./posts.groq').then((res) => res.text());
  const posts = await client.fetch(query);

  return posts;
}

function renderBlockContent(content) {
  if (!content) {
    return '';
  }

  return content
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return `<p>${block.children.map((child) => child.text).join('')}</p>`;
      }

      return '';
    })
    .join('');
}

async function renderPosts() {
  const posts = await getPosts();
  const postsContainer = document.getElementById('posts-container');

  posts.forEach((post) => {
    const postElement = document.createElement('div');

    postElement.classList.add('post');
    postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p><strong>Author:</strong> ${post.authorName}</p>
            <p><strong>Category:</strong> ${post.categoryTitle}</p>
            <div>
                <h3>Content:</h3>
                ${renderBlockContent(post.body)}
            </div>
        `;

    postsContainer.appendChild(postElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
});
