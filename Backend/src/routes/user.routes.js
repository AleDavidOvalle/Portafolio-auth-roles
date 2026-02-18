import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import pool from '../config/db.js';

const router = Router();

router.get('/me', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query(
    'SELECT id, email, role_id FROM users WHERE id = $1',
    [userId]
  );

  res.json(result.rows[0]);
});

export default router;
