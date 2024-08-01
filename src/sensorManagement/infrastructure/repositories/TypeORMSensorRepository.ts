import { Repository, DataSource } from 'typeorm';
import { SensorRepository } from '../../domain/repositories/SensorRepository';
import { Sensor } from '../../domain/entities/Sensor';
import SensorEntity from '../entities/SensorEntity';

export class TypeORMSensorRepository implements SensorRepository {
  private sensorRepository: Repository<SensorEntity>;

  constructor(dataSource: DataSource) {
    this.sensorRepository = dataSource.getRepository(SensorEntity);
  }

  async findAll(): Promise<Sensor[]> {
    const sensorEntities = await this.sensorRepository.find();
    return sensorEntities.map(entity => new Sensor(entity.id, entity.type, entity.value, entity.unit, entity.kitId));
  }

  async findById(id: string): Promise<Sensor | undefined> {
    const sensorEntity = await this.sensorRepository.findOne({ where: { id } });
    if (!sensorEntity) return undefined;
    return new Sensor(sensorEntity.id, sensorEntity.type, sensorEntity.value, sensorEntity.unit, sensorEntity.kitId);
  }

  async save(sensor: Sensor): Promise<void> {
    const sensorEntity = this.sensorRepository.create(sensor);
    await this.sensorRepository.save(sensorEntity);
  }
}
