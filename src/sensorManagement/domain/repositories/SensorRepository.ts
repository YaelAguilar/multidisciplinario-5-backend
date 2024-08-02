import { Sensor } from "../entities/Sensor";

export interface SensorRepository {
  findAll(): Promise<Sensor[]>;
  findById(id: string): Promise<Sensor | undefined>;
  save(sensor: Sensor): Promise<void>;
}
