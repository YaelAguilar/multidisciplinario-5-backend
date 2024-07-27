import { Request, Response } from 'express';
import { RegisterKit } from '../../application/useCases/RegisterKit';
import { UnregisterKit } from '../../application/useCases/UnregisterKit';

export class KitController {
  constructor(
    private registerKit: RegisterKit,
    private unregisterKit: UnregisterKit
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    console.log('Register kit endpoint hit');
    const { serialNumber } = req.body;
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).send({ message: 'User not authenticated' });
      return;
    }
    const result = await this.registerKit.execute(serialNumber, userId);
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  }

  async unregister(req: Request, res: Response): Promise<void> {
    console.log('Unregister kit endpoint hit');
    const { serialNumber } = req.body;
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).send({ message: 'User not authenticated' });
      return;
    }
    const result = await this.unregisterKit.execute(serialNumber, userId);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  }
}
