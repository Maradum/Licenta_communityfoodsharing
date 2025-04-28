import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

// GET - fetch listing by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [rows]: any = await pool.query('SELECT * FROM AddListings WHERE id = ?', [params.id]);
    const listing = rows.length > 0 ? rows[0] : null;

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json({ message: 'Failed to fetch listing' }, { status: 500 });
  }
}

// PUT - update listing by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description } = body;

    const [result]: any = await pool.query(
      'UPDATE AddListings SET title = ?, description = ? WHERE id = ?',
      [title, description, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ message: 'Failed to update listing' }, { status: 500 });
  }
}
