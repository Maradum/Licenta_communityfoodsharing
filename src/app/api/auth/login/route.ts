import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Force Node.js runtime
export const runtime = 'nodejs';

const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const [rows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    const users = rows as any[];

    if (users.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'default_secret_key_for_development',
      { expiresIn: '7d' }
    );

    // Create a raw NextResponse
    const response = new NextResponse(
      JSON.stringify({ message: 'Login successful', user: { name: user.name, role: user.role } }),
      { status: 200 }
    );

    response.headers.set('Content-Type', 'application/json');

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
