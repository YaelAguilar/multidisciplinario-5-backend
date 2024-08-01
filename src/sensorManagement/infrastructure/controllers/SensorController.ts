import { Request, Response } from 'express';
import { SensorRepository } from '../../domain/repositories/SensorRepository';
import { Sensor } from '../../domain/entities/Sensor';

export class SensorController {
  constructor(private sensorRepository: SensorRepository) {}

  async getAllSensors(req: Request, res: Response): Promise<void> {
    try {
      const sensors = await this.sensorRepository.findAll();
      res.status(200).json(sensors);
    } catch (error: any) {
      res.status(500).send('Error retrieving sensors: ' + error.message);
    }
  }

  async addSensor(req: Request, res: Response): Promise<void> {
    const { id, type, value, unit, kitId } = req.body;

    if (!id || !type || !value || !unit || !kitId) {
      res.status(400).send('Missing required fields');
      return;
    }

    const sensor = new Sensor(id, type, value, unit, kitId);

    try {
      await this.sensorRepository.save(sensor);
      res.status(201).send('Sensor created successfully');
    } catch (error: any) {
      res.status(500).send('Error creating sensor: ' + error.message);
    }
  }

  async getSensor(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).send('Sensor ID is required');
      return;
    }

    try {
      const sensor = await this.sensorRepository.findById(id);
      if (sensor) {
        res.status(200).json(sensor);
      } else {
        res.status(404).send('Sensor not found');
      }
    } catch (error: any) {
      res.status(500).send('Error retrieving sensor: ' + error.message);
    }
  }
}
