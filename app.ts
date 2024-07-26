import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import bootstrap from './src/index';

dotenvConfig();

const app = express();
const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  bootstrap(app);
});
