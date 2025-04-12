import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'mainline.proxy.rlwy.net',
    user: 'root',
    password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
    database: 'railway',
    port: 47569,
  });

  const [rows] = await connection.query('SELECT id, name FROM Category');
  await connection.end();
  return NextResponse.json(rows);
}
