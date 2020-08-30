import { Router } from "express";
import {
  RegisterController,
  LogInController,
} from "../controllers/auth.controllers";
import {
  registerValidator,
  loginValidator,
} from "../validators/user.validators";
const router = Router();

router.post("/register", registerValidator, RegisterController);

router.post("/login", loginValidator, LogInController);

export default router;
