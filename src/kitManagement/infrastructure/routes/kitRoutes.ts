import { Router } from 'express';
import { kitController } from '../dependencies';
import { authMiddleware } from '../../../auth/infrastructure/middleware/authMiddleware';

const router = Router();

router.post('/register', authMiddleware, (req, res) => kitController.register(req, res));
router.post('/unregister', authMiddleware, (req, res) => kitController.unregister(req, res));

export default router;
