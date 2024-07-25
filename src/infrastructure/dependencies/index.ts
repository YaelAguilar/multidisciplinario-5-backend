import { RegisterUser } from '../../application/useCases/RegisterUser';
import { LoginUser } from '../../application/useCases/LoginUser';
import { LogoutUser } from '../../application/useCases/LogoutUser';
import { UserController } from '../controllers/UserController';
import { TypeORMUserRepository } from '../repositories/TypeORMUserRepository';
import { DataSource } from 'typeorm';
import { User as UserEntity } from '../entities/UserEntity';
import config from '../ormconfig'; // Asegúrate de importar config correctamente
import dotenv from 'dotenv';

dotenv.config();

// Inicializa el DataSource
const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// Inicializa el repositorio de usuarios
const userRepository = new TypeORMUserRepository(AppDataSource);

// Inicializa los casos de uso con sus respectivas dependencias
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository, process.env.JWT_SECRET || 'default_secret');
const logoutUser = new LogoutUser();

// Inicializa el controlador con los casos de uso
export const userController = new UserController(registerUser, loginUser, logoutUser);
