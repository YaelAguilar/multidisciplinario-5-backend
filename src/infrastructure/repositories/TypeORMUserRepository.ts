import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { Repository, DataSource } from 'typeorm';
import { User as UserEntity } from '../entities/UserEntity';

export class TypeORMUserRepository implements UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async findById(id: string): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) return undefined;
    return new User(userEntity.id, userEntity.name, userEntity.email, userEntity.password);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({ where: { email } });
    if (!userEntity) return undefined;
    return new User(userEntity.id, userEntity.name, userEntity.email, userEntity.password);
  }

  async save(user: User): Promise<void> {
    const userEntity = this.userRepository.create(user);
    await this.userRepository.save(userEntity);
  }
}
