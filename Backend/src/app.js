import express from 'express';
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// 👇 CORS debe ir ANTES de las rutas
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/db-check', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      db: 'connected',
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ db: 'error' });
  }
});

export default app;
