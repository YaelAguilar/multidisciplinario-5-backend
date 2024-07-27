import { UserRepository } from '../../domain/repositories/UserRepository';
import { PasswordComparer } from '../../domain/services/PasswordComparer';
import { TokenGenerator } from '../../domain/services/TokenGenerator';

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private passwordComparer: PasswordComparer,
    private tokenGenerator: TokenGenerator
  ) {}

  async execute(email: string, password: string): Promise<{ success: boolean; message: string; token?: string }> {
    if (!email || !password) {
      return { success: false, message: 'All fields (email, password) are required' };
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const isPasswordValid = await this.passwordComparer.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid password' };
    }

    const token = this.tokenGenerator.generateToken({ userId: user.id });

    return { success: true, message: 'Login successful', token };
  }
}
