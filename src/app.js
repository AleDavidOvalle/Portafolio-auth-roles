import express from 'express';
import pool from './config/db.js';

const app = express();
app.use(express.json());

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
