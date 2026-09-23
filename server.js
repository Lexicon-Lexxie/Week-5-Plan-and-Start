import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dayjs from 'dayjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());

// API endpoint demonstrating dayjs reusable package from Week 5 Quickstart
app.get('/api/dayjs-demo', (req, res) => {
  const now = dayjs();
  res.json({
    message: `Live Server Time: ${now.format('YYYY-MM-DD HH:mm:ss')}`,
    formattedDate: now.format('dddd, MMMM D, YYYY h:mm:ss A'),
    iso: now.toISOString(),
    library: 'dayjs',
    packageExplanation: 'Borrowed from the npm open-source registry via package.json dependency manifest!'
  });
});

// Route css and js requested with relative paths
app.use((req, res, next) => {
  if (req.path.endsWith('/css/styles.css') || req.path === '/css/styles.css') {
    return res.sendFile(path.join(__dirname, 'css', 'styles.css'));
  }
  if (req.path.endsWith('/js/app.js') || req.path === '/js/app.js') {
    return res.sendFile(path.join(__dirname, 'js', 'app.js'));
  }
  next();
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Route root to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route /3d to 3d.html
app.get('/3d', (req, res) => {
  res.sendFile(path.join(__dirname, '3d.html'));
});

// Route /package-shelf
app.get('/package-shelf', (req, res) => {
  res.sendFile(path.join(__dirname, 'package-shelf.html'));
});

// Route /team to team.html
app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, 'team.html'));
});

// 404 handler fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`CS110 Week 5 server listening on http://${HOST}:${PORT}`);
});
