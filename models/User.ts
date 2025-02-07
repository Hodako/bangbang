import { QueryResult } from 'pg';
import pool from '../config/db';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar_url?: string;
}

class UserModel {
  static async create(user: Omit<User, 'id'>): Promise<QueryResult> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [user.username, user.email, hashedPassword]
    );
  }

  static async findByEmail(email: string): Promise<QueryResult> {
    return pool.query('SELECT * FROM users WHERE email = $1', [email]);
  }

  static async updateProfile(userId: number, updates: Partial<User>): Promise<QueryResult> {
    const { username, avatar_url } = updates;
    return pool.query(
      'UPDATE users SET username = $1, avatar_url = $2 WHERE id = $3 RETURNING id, username, email, avatar_url',
      [username, avatar_url, userId]
    );
  }
}

export default UserModel;
