import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { UUIDGenerator } from '../../domain/services/UUIDGenerator';

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private uuidGenerator: UUIDGenerator
  ) {}

  async execute(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log('RegisterUser execute called');
    // Verificar que todos los campos estén presentes
    if (!name || !email || !password) {
      console.log('All fields are required');
      return { success: false, message: 'All fields (name, email, password) are required' };
    }

    // Verificar si el correo ya existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      console.log('Email already exists');
      return { success: false, message: 'Email already exists' };
    }

    // Hashear la contraseña
    const hashedPassword = await this.passwordHasher.hash(password);
    console.log('Password hashed');

    // Crear y guardar el usuario
    const user = new User(this.uuidGenerator.generate(), name, email, hashedPassword);
    await this.userRepository.save(user);
    console.log('User saved');

    return { success: true, message: 'User registered successfully' };
  }
}
