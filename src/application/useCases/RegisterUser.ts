import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    // Verificar que todos los campos estén presentes
    if (!name || !email || !password) {
      return { success: false, message: 'All fields (name, email, password) are required' };
    }

    // Verificar si el correo ya existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el usuario
    const user = new User(uuidv4(), name, email, hashedPassword);
    await this.userRepository.save(user);

    return { success: true, message: 'User registered successfully' };
  }
}
