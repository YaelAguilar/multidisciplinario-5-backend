import { User } from '../../auth/domain/entities/User';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
