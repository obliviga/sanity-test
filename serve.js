const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

http
  .createServer((req, res) => {
    let filePath = path.join(__dirname, req.url);
    if (req.url === '/') {
      filePath = path.join(__dirname, 'blog', 'index.html');
    } else if (req.url.startsWith('/blog')) {
      filePath = path.join(__dirname, req.url.substring(1));
    } else {
      // Handle requests for files like style.css and app.js from index.html
      filePath = path.join(__dirname, 'blog', req.url);
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile('./404.html', (err, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          });
        } else {
          res.writeHead(500);
          res.end(
            'Sorry, check with the site admin for error: ' + err.code + ' ..\n',
          );
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
