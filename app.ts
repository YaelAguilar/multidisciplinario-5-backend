import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import bootstrap from './src/index';

dotenvConfig();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  bootstrap(app);
});
