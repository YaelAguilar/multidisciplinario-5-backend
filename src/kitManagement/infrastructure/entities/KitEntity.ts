import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { SensorEntity } from '../../../sensorManagement/infrastructure/entities/SensorEntity';
import { User } from '../../../auth/infrastructure/entities/UserEntity';

@Entity('kits')
export class Kit {
  @PrimaryColumn()
  serial_number: string;

  @Column({ nullable: true })
  user_id: string | null;

  @ManyToOne(() => User, (user) => user.kits)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(() => SensorEntity, (sensor) => sensor.kit)
  @JoinColumn({ name: 'serial_number' })
  sensors?: SensorEntity[];

  constructor(serial_number: string, user_id: string | null) {
    this.serial_number = serial_number;
    this.user_id = user_id;
  }
}
