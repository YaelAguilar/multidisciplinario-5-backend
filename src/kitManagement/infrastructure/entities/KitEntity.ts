import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../../auth/infrastructure/entities/UserEntity';

@Entity('kits')
export class Kit {
  @PrimaryColumn()
  serial_number: string;

  @Column({ nullable: true })
  user_id: string | null;

  @Column()
  humidity_sensor_id: string;

  @Column()
  light_sensor_id: string;

  @Column()
  food_sensor_id: string;

  @ManyToOne(() => User, (user) => user.kits)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  constructor(serial_number: string, user_id: string | null, humidity_sensor_id: string, light_sensor_id: string, food_sensor_id: string) {
    this.serial_number = serial_number;
    this.user_id = user_id;
    this.humidity_sensor_id = humidity_sensor_id;
    this.light_sensor_id = light_sensor_id;
    this.food_sensor_id = food_sensor_id;
  }
}
