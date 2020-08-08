import { Router } from 'express';
const router = Router();
import { RegisterController, LogInController } from '../controllers/auth.controllers';
import { registerValidator, loginValidator } from '../validators/user.validators';

router.post(
    '/register',
    registerValidator,
    RegisterController
)

router.post(
    '/login',
    loginValidator,
    LogInController
);

export default router;