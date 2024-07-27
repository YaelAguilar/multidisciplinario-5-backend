import { PasswordHasher } from '../../domain/services/PasswordHasher';
import bcrypt from 'bcrypt';

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}