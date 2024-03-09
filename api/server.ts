// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/data', (req, res) => {
  fs.readFile(path.resolve(__dirname, 'server.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).json({ error: 'Ошибка чтения файла' });
    }

    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
