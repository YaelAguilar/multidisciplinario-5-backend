import { Request, Response } from 'express';
import { RegisterUser } from '../../application/useCases/RegisterUser';
import { LoginUser } from '../../application/useCases/LoginUser';
import { LogoutUser } from '../../application/useCases/LogoutUser';

export class UserController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser,
    private logoutUser: LogoutUser
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    console.log('Register endpoint hit');
    const { name, email, password } = req.body;
    const result = await this.registerUser.execute(name, email, password);
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    console.log('Login endpoint hit');
    const { email, password } = req.body;
    const result = await this.loginUser.execute(email, password);
    if (result.success) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(400).json({ message: result.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    console.log('Logout endpoint hit');
    const result = await this.logoutUser.execute();
    res.json({ message: result.message });
  }
}
