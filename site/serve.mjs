import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', 'dist');
const PORT = Number(process.env.PORT ?? 4321);
const HOST = process.env.HOST ?? '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function resolvePath(pathname) {
  const decoded = decodeURIComponent(pathname.split('?')[0]);
  const safe = normalize(join(sep, decoded)).replace(/^(\.\.[/\\])+/, '');
  let target = join(ROOT, safe);

  if (existsSync(target) && statSync(target).isDirectory())
    target = join(target, 'index.html');

  return target;
}

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  const resolved = resolvePath(req.url ?? '/');
  const found = existsSync(resolved) && statSync(resolved).isFile();
  const target = found ? resolved : join(ROOT, '404.html');
  const status = found ? 200 : 404;
  const contentType = MIME_TYPES[extname(target)] ?? 'application/octet-stream';

  res.writeHead(status, { 'Content-Type': contentType });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  createReadStream(target).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
