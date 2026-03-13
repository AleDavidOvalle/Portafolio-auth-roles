import { Router } from "express";
import { usersByRole, usersByDate } from "../controllers/stats.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users-by-role", verifyToken, usersByRole);
router.get("/users-by-date", verifyToken, usersByDate);

export default router;