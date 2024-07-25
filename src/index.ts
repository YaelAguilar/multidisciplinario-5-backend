import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import config from './infrastructure/ormconfig';
import userRoutes from './infrastructure/routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource(config);

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const app = express();
    app.use(express.json());

    // Rutas de usuario
    app.use('/user', userRoutes);

    console.log('Server initialized successfully');
  } catch (error) {
    console.error('Error during server initialization', error);
  }
}

export default bootstrap;
