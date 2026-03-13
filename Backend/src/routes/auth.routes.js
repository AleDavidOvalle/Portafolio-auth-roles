import { Router } from 'express';
import {
  register,
  login,
  dashboard,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", verifyToken, dashboard);
router.put("/profile", verifyToken, updateProfile);

export default router;
