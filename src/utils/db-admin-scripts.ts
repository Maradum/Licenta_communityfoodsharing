import { Sequelize, QueryTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Setup database connection
const dbUrl = process.env.DATABASE_URL || 'mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway';
const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

/**
 * This script will check all users in the database and rehash any plaintext passwords.
 * Run this with: `npx ts-node src/utils/db-admin-scripts.ts rehashPasswords`
 */

interface UserRecord {
  id: string;
  email: string;
  password: string;
}

/**
 * Rehashes all plaintext passwords in the database to bcrypt hashes
 */
async function rehashPasswords() {
  try {
    console.log('Starting password rehashing process...');
    
    // Get all users
    const users = await sequelize.query(
      `SELECT id, email, password FROM Users`,
      {
        type: QueryTypes.SELECT
      }
    ) as UserRecord[];
    
    console.log(`Found ${users.length} user records`);
    
    let hashCount = 0;
    let skippedCount = 0;
    
    // Process each user
    for (const user of users) {
      // Check if password is already hashed
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        console.log(`User ${user.email}: Password already hashed, skipping`);
        skippedCount++;
        continue;
      }
      
      console.log(`User ${user.email}: Converting plaintext password to hash`);
      try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        // Update the user record
        await sequelize.query(
          `UPDATE Users SET password = ? WHERE id = ?`,
          {
            replacements: [hashedPassword, user.id]
          }
        );
        
        hashCount++;
        console.log(`User ${user.email}: Password updated successfully`);
      } catch (err) {
        console.error(`Error updating password for user ${user.email}:`, err);
      }
    }
    
    console.log('Password rehashing complete');
    console.log(`Total users: ${users.length}`);
    console.log(`Users updated: ${hashCount}`);
    console.log(`Users skipped (already hashed): ${skippedCount}`);
  } catch (error) {
    console.error('Error during password rehashing:', error);
  } finally {
    // Close the connection
    await sequelize.close();
  }
}

/**
 * Script runner - checks command line args to decide which function to run
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Please specify a command:');
    console.log('  rehashPasswords - Rehash all plaintext passwords');
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'rehashPasswords':
      await rehashPasswords();
      break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log('Available commands:');
      console.log('  rehashPasswords - Rehash all plaintext passwords');
  }
}

// Run the script if directly executed
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { rehashPasswords }; 