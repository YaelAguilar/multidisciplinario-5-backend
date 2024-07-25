import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import bootstrap from './src/index';

const app = express();
dotenvConfig();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    bootstrap();
});