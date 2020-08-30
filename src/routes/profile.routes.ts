import { Router } from "express";
import { ProfileController } from "../controllers/profile.controllers";
import authMiddleware from "../middlewares/auth.middlewares";
const router = Router();

router.get("/profile", authMiddleware, ProfileController);

export default router;
