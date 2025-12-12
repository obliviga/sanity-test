module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({static: 'static'})
  eleventyConfig.addPassthroughCopy({'blog/style.css': 'style.css'})

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html'],
  }
}
