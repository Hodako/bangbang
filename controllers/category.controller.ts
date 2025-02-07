import { Request, Response } from 'express';
import pool from '../config/db';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};
