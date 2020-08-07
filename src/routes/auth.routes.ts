import { Router } from 'express';
const router = Router();
import { RegisterController } from '../controllers/auth.controllers';
import { registerValidator } from '../validators/user.validators';

router.post(
    '/register',
    registerValidator,
    RegisterController
)

export default router;