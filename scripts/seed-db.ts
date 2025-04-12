import mysql from 'mysql2/promise';

async function main() {
  const connection = await mysql.createConnection({
    host: 'mainline.proxy.rlwy.net',
    user: 'root',
    password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
    database: 'railway',
    port: 47569,
  });

  console.log('🌱 Seeding categories...');
  const categories = ['Fruits', 'Bakery', 'Dairy', 'Canned', 'Vegetables', 'Other'];
  for (const name of categories) {
    await connection.query(`INSERT INTO Category (name) VALUES (?)`, [name]);
  }

  console.log('🌍 Seeding cities...');
  const cities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool'];
  for (const name of cities) {
    await connection.query(`INSERT INTO City (name) VALUES (?)`, [name]);
  }

  console.log('✅ Seeding completed!');
  await connection.end();
}

main().catch((err) => {
  console.error('❌ Error during seeding:', err);
});
