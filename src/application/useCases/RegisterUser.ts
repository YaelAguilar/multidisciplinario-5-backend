import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    // campos faltantes
    if (!name || !email || !password) {
      return { success: false, message: 'All fields (name, email, password) are required' };
    }

    // correo existente
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // rear cuenta
    const user = new User(uuidv4(), name, email, hashedPassword);
    await this.userRepository.save(user);

    return { success: true, message: 'User registered successfully' };
  }
}
