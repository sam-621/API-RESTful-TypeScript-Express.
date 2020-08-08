import { Router } from 'express';
import { GetUserInfo } from '../controllers/user.controllers';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.get(
    '/userinfo',
    authMiddleware,
    GetUserInfo
)

export default router;