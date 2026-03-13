import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getProfile, updateProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", verifyToken, getProfile);
router.put("/update", verifyToken, updateProfile);

export default router;
