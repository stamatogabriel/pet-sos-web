const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://apva-web.vercel.app',
  pagesDirectory: __dirname + '/pages',
  targetDirectory: 'public/',
  ignoredExtensions: ['png', 'jpg'],
});
