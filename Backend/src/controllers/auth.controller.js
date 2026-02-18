import pool from '../config/db.js';
import { hashPassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../utils/password.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;




   
    if (!email || !password) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    
    const userExists = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    
    const hashedPassword = await hashPassword(password);

    
    await pool.query(
      `INSERT INTO users (email, password, role_id)
       VALUES ($1, $2, $3)`,
      [email, hashedPassword, 1]
    );

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const result = await pool.query(
      'SELECT id, email, password, role_id FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });

    }

    const user = result.rows[0];

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

 console.log('ENV CARGADO 👉', {
  JWT_SECRET: process.env.JWT_SECRET ? 'OK' : 'MISSING'
});


    const token = jwt.sign(
      {
        userId: user.id,
        roleId: user.role_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        roleId: user.role_id,
      },
    });
  } catch (error) {
  console.error('LOGIN ERROR 👉', error);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: error.message
  });
}
};
