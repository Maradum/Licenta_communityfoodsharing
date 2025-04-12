import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

// ✅ Create MySQL connection pool
const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // ❗ Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // 🔍 Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    if ((existingUsers as any).length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Insert new user into the database
    const [result] = await pool.query(
      'INSERT INTO User (name, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, 'user', new Date()]
    );

    return NextResponse.json({ message: 'User created', id: (result as any).insertId });
  } catch (error) {
    console.error('❌ Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
