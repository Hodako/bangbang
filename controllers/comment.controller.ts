import { Request, Response } from 'express';
import pool from '../config/db';

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, article_id } = req.body;
    const result = await pool.query(
      'INSERT INTO comments (content, user_id, article_id) VALUES ($1, $2, $3) RETURNING *',
      [content, (req as any).user.id, article_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const result = await pool.query(
      `SELECT c.*, u.username 
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE article_id = $1
       ORDER BY created_at DESC`,
      [articleId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};
