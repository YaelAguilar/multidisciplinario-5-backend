import { KitRepository } from '../../domain/repositories/KitRepository';
import { Kit } from '../../domain/entities/Kit';
import { Repository, DataSource } from 'typeorm';
import { Kit as KitEntity } from '../entities/KitEntity';

export class TypeORMKitRepository implements KitRepository {
  private kitRepository: Repository<KitEntity>;

  constructor(dataSource: DataSource) {
    this.kitRepository = dataSource.getRepository(KitEntity);
  }

  async findBySerialNumber(serialNumber: string): Promise<Kit | undefined> {
    const kitEntity = await this.kitRepository.findOne({ where: { serial_number: serialNumber } });
    if (!kitEntity) return undefined;
    return new Kit(kitEntity.serial_number, kitEntity.user_id, kitEntity.humidity_sensor_id, kitEntity.light_sensor_id, kitEntity.food_sensor_id);
  }

  async save(kit: Kit): Promise<void> {
    const kitEntity = this.kitRepository.create(kit);
    await this.kitRepository.save(kitEntity);
  }
}
