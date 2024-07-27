import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Kit } from '../../../kitManagement/infrastructure/entities/KitEntity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Kit, (kit) => kit.user)
  kits?: Kit[];

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
