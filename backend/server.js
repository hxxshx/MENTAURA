const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from parent directory (where your HTML/CSS/JS files are)
app.use(express.static(path.join(__dirname, '..')));

// Language translations storage
const translations = {
  en: require('./translations/en.json'),
  hi: require('./translations/hi.json'),
  ur: require('./translations/ur.json'),
  ks: require('./translations/ks.json'),
  do: require('./translations/do.json')
};

// API endpoint to get translations for a specific language
app.get('/api/translations/:lang', (req, res) => {
  const { lang } = req.params;
  
  if (!translations[lang]) {
    return res.status(404).json({ error: 'Language not found' });
  }
  
  res.json({
    success: true,
    language: lang,
    translations: translations[lang]
  });
});

// Serve HTML files from parent directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/:page.html', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, '..', `${page}.html`);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, '..')}`);
});
