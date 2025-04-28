import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { verifyToken } from '@/lib/auth';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

// POST - create new listing
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.userId;
    const data = await req.json();

    const {
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
    } = data;

    const [cityCheck] = await pool.query('SELECT id FROM City WHERE name = ?', [location]);
    if ((cityCheck as any).length === 0) {
      return NextResponse.json({ message: 'Invalid city selected' }, { status: 400 });
    }

    const [categoryCheck] = await pool.query('SELECT id FROM Category WHERE name = ?', [category]);
    if ((categoryCheck as any).length === 0) {
      return NextResponse.json({ message: 'Invalid category selected' }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO AddListings (title, description, category, location, userName, phoneNumber, foodType, listingDuration, expiryDate, expiryNote, userId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
    console.error('Error creating listing:', error);
    return NextResponse.json({ message: 'Failed to create listing' }, { status: 500 });
  }
}
