import { TokenGenerator } from '../../domain/services/TokenGenerator';
import jwt from 'jsonwebtoken';

export class JWTTokenGenerator implements TokenGenerator {
  constructor(private jwtSecret: string) {}

  generateToken(payload: object): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }
}
