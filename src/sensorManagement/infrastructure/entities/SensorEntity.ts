import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Kit } from '../../../kitManagement/infrastructure/entities/KitEntity';

@Entity('sensors')
export class SensorEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @Column()
  unit: string;

  @Column()
  kitId: string;

  @ManyToOne(() => Kit, (kit) => kit.sensors)
  @JoinColumn({ name: 'kitId', referencedColumnName: 'serial_number' })
  kit?: Kit;

  constructor(type: string, value: string, unit: string, kitId: string) {
    this.type = type;
    this.value = value;
    this.unit = unit;
    this.kitId = kitId;
  }
}

export default SensorEntity;
