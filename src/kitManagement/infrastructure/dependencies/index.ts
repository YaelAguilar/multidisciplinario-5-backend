import { RegisterKit } from '../../../kitManagement/application/useCases/RegisterKit';
import { UnregisterKit } from '../../../kitManagement/application/useCases/UnregisterKit';
import { KitController } from '../../../kitManagement/infrastructure/controllers/KitController';
import { TypeORMKitRepository } from '../../../kitManagement/infrastructure/repositories/TypeORMKitRepository';
import { AppDataSource } from '../../../config/db';

import dotenv from 'dotenv';

dotenv.config();

const kitRepository = new TypeORMKitRepository(AppDataSource);

const registerKit = new RegisterKit(kitRepository);
const unregisterKit = new UnregisterKit(kitRepository);

export const kitController = new KitController(registerKit, unregisterKit);
