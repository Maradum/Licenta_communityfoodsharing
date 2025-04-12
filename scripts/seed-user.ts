import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

async function main() {
  const connection = await mysql.createConnection({
    host: 'mainline.proxy.rlwy.net',
    user: 'root',
    password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
    database: 'railway',
    port: 47569,
  });

  const passwordHash = await bcrypt.hash('test1234', 10);

  await connection.query(
    `INSERT INTO User (name, email, password, role, createdAt) VALUES (?, ?, ?, ?, NOW())`,
    ['Test User', 'test@example.com', passwordHash, 'user']
  );

  console.log('✅ Test user created!');
  await connection.end();
}

main().catch((err) => console.error('❌ Error:', err));
