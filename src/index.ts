import 'reflect-metadata';
import express, { Express } from 'express';
import { AppDataSource } from './config/db';
import userRoutes from './infrastructure/routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap(app: Express) {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    app.use(express.json());

    // Rutas de usuario
    app.use('/user', userRoutes);

    console.log('Server initialized successfully');
  } catch (error) {
    console.error('Error during server initialization', error);
  }
}

export default bootstrap;
