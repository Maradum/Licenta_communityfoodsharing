import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ✅ Force Node.js runtime
export const runtime = 'nodejs';

// ✅ Database connection
const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    // ✅ Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert new user into database
    const [result] = await pool.query(
      'INSERT INTO User (name, email, password, role, createdAt) VALUES (?, ?, ?, ?, NOW())',
      [name, email, hashedPassword, role || 'user']
    );

    // ✅ Create JWT token
    const token = jwt.sign(
      { userId: (result as any).insertId, name, role },
      process.env.JWT_SECRET || 'default_secret_key_for_development',
      { expiresIn: '7d' }
    );

    // ✅ Create response and set HttpOnly cookie
    const response = NextResponse.json({ message: 'Signup successful', user: { name, role } });
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

