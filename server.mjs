import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

import { gDirname } from './utils/utilityFunctions.mjs';

dotenv.config();

const app = express();

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${gDirname(import.meta.url)}/views/index.html`);
});

app.get('/hello', (req, res) => {
  res.json({ greetings: 'Hello, API' });
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({ name: req.file.originalname, size: req.file.size });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Node.js listening on Port ${process.env.PORT || 3000}`);
});
