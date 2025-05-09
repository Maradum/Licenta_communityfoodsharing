import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// MySQL pool connection
const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
  database: 'railway',
  port: 47569,
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [rows]: any = await pool.query('SELECT * FROM listings WHERE id = ?', [params.id]);
    const listing = rows.length > 0 ? rows[0] : null;

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json({ message: 'Error fetching listing' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description } = body;

    const [result]: any = await pool.query(
      'UPDATE listings SET title = ?, description = ? WHERE id = ?',
      [title, description, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Listing updated successfully' });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ message: 'Error updating listing' }, { status: 500 });
  }
}

