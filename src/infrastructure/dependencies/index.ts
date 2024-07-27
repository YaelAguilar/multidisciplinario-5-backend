import { RegisterUser } from '../../application/useCases/RegisterUser';
import { LoginUser } from '../../application/useCases/LoginUser';
import { LogoutUser } from '../../application/useCases/LogoutUser';
import { UserController } from '../controllers/UserController';
import { TypeORMUserRepository } from '../repositories/TypeORMUserRepository';
import { AppDataSource } from '../../config/db';
import { BcryptPasswordHasher } from '../services/BcryptPasswordHasher';
import { BcryptPasswordComparer } from '../services/BcryptPasswordComparer';
import { UUIDV4Generator } from '../services/UUIDV4Generator';
import { JWTTokenGenerator } from '../services/JWTTokenGenerator';
import dotenv from 'dotenv';

dotenv.config();

// Inicializa el repositorio de usuarios
const userRepository = new TypeORMUserRepository(AppDataSource);
const passwordHasher = new BcryptPasswordHasher();
const passwordComparer = new BcryptPasswordComparer();
const uuidGenerator = new UUIDV4Generator();
const tokenGenerator = new JWTTokenGenerator(process.env.JWT_SECRET || 'default_secret');

// Inicializa los casos de uso con sus respectivas dependencias
const registerUser = new RegisterUser(userRepository, passwordHasher, uuidGenerator);
const loginUser = new LoginUser(userRepository, passwordComparer, tokenGenerator);
const logoutUser = new LogoutUser();

// Inicializa el controlador con los casos de uso
export const userController = new UserController(registerUser, loginUser, logoutUser);
