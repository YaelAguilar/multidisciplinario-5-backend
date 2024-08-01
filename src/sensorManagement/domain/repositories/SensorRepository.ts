import { Sensor } from "../entities/Sensor";

export interface SensorRepository {
  findAll(): Promise<Sensor[]>; // Método findAll
  findById(id: string): Promise<Sensor | undefined>; // Método findById
  save(sensor: Sensor): Promise<void>;
}
