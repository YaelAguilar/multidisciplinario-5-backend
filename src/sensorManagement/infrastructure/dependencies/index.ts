import { AppDataSource } from '../../../config/db';
import { TypeORMSensorRepository } from '../repositories/TypeORMSensorRepository';
import { MosquittoService } from '../services/MosquittoService';
import { SensorController } from '../controllers/SensorController';
import { Server } from 'socket.io';

const sensorRepository = new TypeORMSensorRepository(AppDataSource);

const sensorController = new SensorController(sensorRepository);

export { sensorRepository, sensorController };

export function initializeMosquittoService(io: Server) {
  return new MosquittoService(sensorRepository, io);
}
