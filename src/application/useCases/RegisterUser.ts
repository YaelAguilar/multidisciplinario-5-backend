import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log('RegisterUser execute called'); // Log para verificar la ejecución
    // Verificar que todos los campos estén presentes
    if (!name || !email || !password) {
      console.log('All fields are required'); // Log de error
      return { success: false, message: 'All fields (name, email, password) are required' };
    }

    // Verificar si el correo ya existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      console.log('Email already exists'); // Log de error
      return { success: false, message: 'Email already exists' };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed'); // Log para verificar el hash de la contraseña

    // Crear y guardar el usuario
    const user = new User(uuidv4(), name, email, hashedPassword);
    await this.userRepository.save(user);
    console.log('User saved'); // Log para verificar el guardado del usuario

    return { success: true, message: 'User registered successfully' };
  }
}
