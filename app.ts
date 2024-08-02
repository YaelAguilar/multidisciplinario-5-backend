import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import bootstrap from './src/index';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenvConfig();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const PORT = process.env.PORT || 3010;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  bootstrap(app, io);
});
