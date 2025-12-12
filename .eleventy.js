module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('src/');

  // Compute path from a page to the site root for relative asset URLs
  eleventyConfig.addFilter('pathToRoot', (url) => {
    if (!url || url === '/') return '';
    const parts = String(url).split('/').filter(Boolean);
    return '../'.repeat(parts.length);
  });

  // Portable Text renderer
  const { toHTML } = require('@portabletext/to-html');

  eleventyConfig.addFilter('portableText', (blocks) => {
    if (!blocks) return '';

    try {
      return toHTML(blocks);
    } catch (e) {
      console.warn('Portable Text render error:', e.message);
      return '';
    }
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    htmlTemplateEngine: 'liquid',
    templateFormats: ['liquid'],
  };
};
