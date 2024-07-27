import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TypeORMUserRepository } from '../repositories/TypeORMUserRepository';
import { AppDataSource } from '../../../config/db';

const userRepository = new TypeORMUserRepository(AppDataSource);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { userId: string };
    
    const user = await userRepository.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};
