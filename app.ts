import express from 'express';
import { config as dotenvConfig } from 'dotenv';

const app = express();
dotenvConfig();

const PORT = process.env.PORT;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
