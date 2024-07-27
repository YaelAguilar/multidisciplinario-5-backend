import { RegisterKit } from '../../../kitManagement/application/useCases/RegisterKit';
import { UnregisterKit } from '../../../kitManagement/application/useCases/UnregisterKit';
import { KitController } from '../../../kitManagement/infrastructure/controllers/KitController';
import { TypeORMKitRepository } from '../../../kitManagement/infrastructure/repositories/TypeORMKitRepository';
import { AppDataSource } from '../../../config/db';

import dotenv from 'dotenv';

dotenv.config();

// Inicializa el repositorio de usuarios
const kitRepository = new TypeORMKitRepository(AppDataSource);

// Inicializa los casos de uso con sus respectivas dependencias
const registerKit = new RegisterKit(kitRepository);
const unregisterKit = new UnregisterKit(kitRepository);

// Inicializa el controlador con los casos de uso
export const kitController = new KitController(registerKit, unregisterKit);
