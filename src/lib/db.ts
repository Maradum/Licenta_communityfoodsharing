import 'dotenv/config'; 
import mysql from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL || '';
const parsed = new URL(dbUrl);

const db = mysql.createPool({
  host: parsed.hostname,
  user: parsed.username,
  password: parsed.password,
  database: parsed.pathname.replace('/', ''),
  port: Number(parsed.port),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
