import { AppDataSource } from '../../../config/db';
import { TypeORMSensorRepository } from '../repositories/TypeORMSensorRepository';
import { MosquittoService } from '../services/MosquittoService';
import { SensorController } from '../controllers/SensorController';

// Inicializa el repositorio de sensores
const sensorRepository = new TypeORMSensorRepository(AppDataSource);

// Inicializa el servicio de Mosquitto con el repositorio de sensores
export const mosquittoService = new MosquittoService(sensorRepository);

// Inicializa el controlador de sensores
const sensorController = new SensorController(sensorRepository);

export { sensorRepository, sensorController };
