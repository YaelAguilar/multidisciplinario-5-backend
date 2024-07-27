import { PasswordComparer } from '../../domain/services/PasswordComparer';
import bcrypt from 'bcrypt';

export class BcryptPasswordComparer implements PasswordComparer {
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
