import mysql from 'mysql2/promise';

async function main() {
  const connection = await mysql.createConnection({
    host: 'mainline.proxy.rlwy.net',
    user: 'root',
    password: 'DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS',
    database: 'railway',
    port: 47569,
  });

  console.log('🔄 Dropping existing tables...');
  await connection.query(`DROP TABLE IF EXISTS Messages, Claim, Listing, Category, City, User`);

  console.log('📦 Creating tables...');
  await connection.query(`
    CREATE TABLE User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin', 'donor', 'recipient') DEFAULT 'user',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.query(`
    CREATE TABLE City (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE Category (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE Listing (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      location VARCHAR(100) NOT NULL,
      userName VARCHAR(100) NOT NULL,
      phoneNumber VARCHAR(30) NOT NULL,
      foodType VARCHAR(50) NOT NULL,
      listingDuration VARCHAR(50) NOT NULL,
      expiryDate DATE,
      expiryNote VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      userId INT,
      FOREIGN KEY (userId) REFERENCES User(id)
    )
  `);

  await connection.query(`
    CREATE TABLE Claim (
      id INT AUTO_INCREMENT PRIMARY KEY,
      listingId INT NOT NULL,
      userId INT NOT NULL,
      claimedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listingId) REFERENCES Listing(id),
      FOREIGN KEY (userId) REFERENCES User(id)
    )
  `);

  await connection.query(`
    CREATE TABLE Messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      senderId INT NOT NULL,
      receiverId INT NOT NULL,
      content TEXT NOT NULL,
      sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (senderId) REFERENCES User(id),
      FOREIGN KEY (receiverId) REFERENCES User(id)
    )
  `);

  console.log('✅ All tables created successfully!');
  await connection.end();
}

main().catch((err) => {
  console.error('❌ Error creating tables:', err);
});
