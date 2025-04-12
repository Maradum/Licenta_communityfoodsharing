import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { verifyToken } from '@/lib/auth';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

export async function POST(req: NextRequest) {
  try {
    // 🔐 Extract and verify the authentication token
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 📨 Read the request body
    const data = await req.json();

    // 📍 Extract city and category first for validation
    const { location, category } = data;

    // 🔍 Validate if the city exists
    const [cityCheck] = await pool.query('SELECT id FROM City WHERE name = ?', [location]);
    if ((cityCheck as any).length === 0) {
      return NextResponse.json({ message: 'Invalid city selected' }, { status: 400 });
    }

    // 🔍 Validate if the category exists
    const [categoryCheck] = await pool.query('SELECT id FROM Category WHERE name = ?', [category]);
    if ((categoryCheck as any).length === 0) {
      return NextResponse.json({ message: 'Invalid category selected' }, { status: 400 });
    }

    // ✅ Destructure the rest of the fields
    const {
      title,
      description,
      userName,
      phoneNumber,
      foodType,
      listingDuration,
      expiryDate,
      expiryNote,
    } = data;

    // 📦 Insert the listing into the database
    const [result] = await pool.query(
      `INSERT INTO listings (title, description, category, location, userName, phoneNumber, foodType, listingDuration, expiryDate, expiryNote, userId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category,
        location,
        userName,
        phoneNumber,
        foodType,
        listingDuration,
        expiryDate,
        expiryNote,
        userId,
      ]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });

  } catch (error) {
    console.error('❌ Error creating listing:', error);
    return NextResponse.json({ message: 'Failed to create listing' }, { status: 500 });
  }
}
