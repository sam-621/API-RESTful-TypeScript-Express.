import { Router } from 'express';
import { HomeController } from '../controllers/home.controllers';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.get(
    '/home',
    authMiddleware,
    HomeController
);

export default router;