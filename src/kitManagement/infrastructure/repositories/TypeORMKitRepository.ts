import { Repository, DataSource } from 'typeorm';
import { KitRepository } from '../../domain/repositories/KitRepository';
import { Kit } from '../../domain/entities/Kit';
import { Kit as KitEntity } from '../entities/KitEntity';
import SensorEntity from '../../../sensorManagement/infrastructure/entities/SensorEntity';
import { Sensor } from '../../../sensorManagement/domain/entities/Sensor';

export class TypeORMKitRepository implements KitRepository {
  private kitRepository: Repository<KitEntity>;

  constructor(dataSource: DataSource) {
    this.kitRepository = dataSource.getRepository(KitEntity);
  }

  async findBySerialNumber(serialNumber: string): Promise<Kit | undefined> {
    const kitEntity = await this.kitRepository.findOne({ where: { serial_number: serialNumber }, relations: ['sensors'] });
    if (!kitEntity) return undefined;
    return new Kit(
      kitEntity.serial_number,
      kitEntity.user_id,
      kitEntity.sensors ? kitEntity.sensors.map(sensor => new Sensor(sensor.id, sensor.type, sensor.value, sensor.unit, sensor.kitId)) : []
    );
  }

  async save(kit: Kit): Promise<void> {
    const kitEntity = this.kitRepository.create(kit);
    await this.kitRepository.save(kitEntity);
  }
}
