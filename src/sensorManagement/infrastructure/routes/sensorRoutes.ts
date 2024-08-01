import { Router } from 'express';
import { sensorController } from '../dependencies';

const router = Router();

router.get('/sensors', sensorController.getAllSensors.bind(sensorController));
router.post('/sensors', sensorController.addSensor.bind(sensorController));
router.get('/sensors/:id', sensorController.getSensor.bind(sensorController));

export default router;
