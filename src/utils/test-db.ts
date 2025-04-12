import mysql from 'mysql2/promise';

const dbUrl = 'mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway';

(async () => {
  try {
    const parsed = new URL(dbUrl);

    const connection = await mysql.createConnection({
      host: parsed.hostname,
      user: parsed.username,
      password: parsed.password,
      database: parsed.pathname.replace('/', ''),
      port: Number(parsed.port),
    });

    const [rows] = await connection.execute('SELECT NOW() AS now');
    console.log('✅ Connection success:', rows);
    await connection.end();
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
})();
