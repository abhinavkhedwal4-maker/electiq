// ============================================
//   ELECTIQ — Node.js Server
//   Keeps API key safe via .env
// ============================================

const http   = require('http');
const fs     = require('fs');
const path   = require('path');
require('dotenv').config();

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css' : 'text/css',
  '.js'  : 'application/javascript',
  '.json': 'application/json',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.svg' : 'image/svg+xml',
  '.ico' : 'image/x-icon',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ---- /api/chat — Groq proxy ----
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const { messages } = JSON.parse(body);

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            model      : process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
            messages,
            temperature: 0.7,
            max_tokens : 800,
            stream     : false,
          }),
        });

        const data = await groqRes.json();
        res.writeHead(groqRes.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));

      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ---- Static file server ----
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';
  filePath = filePath.split('?')[0]; // strip query strings

  const extname     = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h2 style="font-family:sans-serif;padding:2rem">404 — File Not Found</h2>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('\n🗳️  ElectIQ is running!');
  console.log(`👉  http://localhost:${PORT}`);
  console.log(`🔑  API Key: ${process.env.GROQ_API_KEY ? '✅ Loaded from .env' : '❌ MISSING — check your .env file'}`);
  console.log(`🤖  Model: ${process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'}`);
  console.log('\nPress Ctrl+C to stop.\n');
});