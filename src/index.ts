import 'reflect-metadata';
import express, { Express } from 'express';
import { AppDataSource } from './config/db';
import userRoutes from './auth/infrastructure/routes/userRoutes';
import kitRoutes from './kitManagement/infrastructure/routes/kitRoutes';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap(app: Express) {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    app.use(express.json());

    // Rutas de usuario
    app.use('/user', userRoutes);
    // Rutas de kit
    app.use('/kit', kitRoutes);

    console.log('Server initialized successfully');
  } catch (error) {
    console.error('Error during server initialization', error);
  }
}

export default bootstrap;
