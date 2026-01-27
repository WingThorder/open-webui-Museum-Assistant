import { createServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certsDir = path.join(__dirname, 'certs');
const keyPath = path.join(certsDir, 'key.pem');
const certPath = path.join(certsDir, 'cert.pem');

// Serve static files from the current directory
const serveStatic = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = path.join(__dirname, url.pathname);

  // Default to index.html for root path
  if (url.pathname === '/' || url.pathname === '/ar.html') {
    filePath = path.join(__dirname, 'static', 'ar.html');
  }

  // Serve assets from static/assets directory
  if (url.pathname.startsWith('/assets/')) {
    filePath = path.join(__dirname, 'static', url.pathname);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    // Set appropriate content type based on file extension
    let contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    else if (filePath.endsWith('.js')) contentType = 'application/javascript';
    else if (filePath.endsWith('.png')) contentType = 'image/png';
    else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (filePath.endsWith('.mp4')) contentType = 'video/mp4';
    else if (filePath.endsWith('.patt')) contentType = 'text/plain';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
};

// Create HTTPS server
const httpsServer = createHttpsServer({
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}, serveStatic);

const PORT = 8443;
httpsServer.listen(PORT, () => {
  console.log(`HTTPS server running at https://localhost:${PORT}/`);
  console.log(`AR page available at: https://localhost:${PORT}/ar.html`);
});