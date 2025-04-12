import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Rulează o interogare simplă pentru a testa conexiunea
    const [rows] = await db.query('SELECT 1 + 1 AS result');

    return NextResponse.json({
      success: true,
      message: 'Database connection successful.',
      result: rows,
    });
  } catch (error: any) {
    console.error('Database connection failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
    });
  }
}
