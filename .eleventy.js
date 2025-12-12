module.exports = function (eleventyConfig) {
  // Ensure HMR
  eleventyConfig.addPassthroughCopy({ static: 'static' });
  eleventyConfig.addWatchTarget('src/');

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
