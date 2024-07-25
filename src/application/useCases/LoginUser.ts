import { UserRepository } from '../../domain/repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginUser {
  constructor(private userRepository: UserRepository, private jwtSecret: string) {}

  async execute(email: string, password: string): Promise<{ success: boolean; message: string; token?: string }> {
    // Verificar que todos los campos estén presentes
    if (!email || !password) {
      return { success: false, message: 'All fields (email, password) are required' };
    }

    // Verificar si el usuario existe
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return { success: false, message: 'Email not registered' };
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { success: false, message: 'Incorrect password' };
    }

    const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '1h' });
    return { success: true, message: 'Login successful', token };
  }
}
