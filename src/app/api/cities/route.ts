import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

// GET - fetch cities
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT id, name FROM City');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ message: 'Failed to load cities' }, { status: 500 });
  }
}


