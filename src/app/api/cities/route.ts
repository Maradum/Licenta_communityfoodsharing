import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const pool = mysql.createPool({
    host: 'mainline.proxy.rlwy.net',
    user: 'root',
    password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
    database: 'railway',
    port: 47569,
  });

  try {
    const [rows] = await pool.query('SELECT id, name FROM city');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ message: 'Failed to load cities' }, { status: 500 });
  }
}
