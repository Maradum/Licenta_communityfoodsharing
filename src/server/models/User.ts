import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
// Import mysql2 explicitly
import mysql2 from 'mysql2';

// Create Sequelize instance
const dbUrl = process.env.DATABASE_URL || 'mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway';
export const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',
  logging: false,
  dialectModule: mysql2, // Explicitly specify the dialect module
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

// User attributes interface
interface UserAttributes {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'donor' | 'beneficiary' | 'admin';
  phoneNumber?: string;
  location?: string;
  createdAt: Date;
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'suspended';
}

// Interface for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'lastLogin' | 'status'> {
  // Adding a comment to prevent the empty interface warning
  // This type is used to specify which fields are optional when creating a user
}

// User model class
export class User extends Model<UserAttributes, UserCreationAttributes> {
  // Method to compare password for login
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    try {
      console.log('Comparing passwords:');
      const storedPassword = this.getDataValue('password');
      console.log('- Stored hash length:', storedPassword.length);
      console.log('- Candidate password length:', candidatePassword.length);
      
      // For debugging only - DO NOT KEEP THIS IN PRODUCTION
      if (process.env.DEBUG === 'true') {
        console.log('- First 20 chars of hash:', storedPassword.substring(0, 20) + '...');
      }
      
      const isMatch = await bcrypt.compare(candidatePassword, storedPassword);
      console.log('- Password match result:', isMatch);
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  }
}

// Initialize User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Minimum 8 characters
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('donor', 'beneficiary', 'admin'),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true, // Enables createdAt and updatedAt
    hooks: {
      beforeCreate: async (user: User) => {
        const password = user.getDataValue('password');
        if (password) {
          console.log('Hashing password during user creation:');
          console.log('- Original password length:', password.length);
          
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          user.setDataValue('password', hashedPassword);
          
          console.log('- Hashed password length:', hashedPassword.length);
          console.log('- First 20 chars of hash:', hashedPassword.substring(0, 20) + '...');
        }
      },
      beforeUpdate: async (user: User) => {
        if ((user as any).changed('password')) {
          const password = user.getDataValue('password');
          console.log('Hashing password during user update:');
          console.log('- Original password length:', password.length);
          
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          user.setDataValue('password', hashedPassword);
          
          console.log('- Hashed password length:', hashedPassword.length);
          console.log('- First 20 chars of hash:', hashedPassword.substring(0, 20) + '...');
        }
      },
    },
  }
);

// Remove initUserModel as it's no longer needed
// Initialize model automatically
sequelize.authenticate()
  .then(() => console.log('MySQL Database Connected'))
  .catch(err => console.error('Error connecting to MySQL:', err));

export type { UserAttributes, UserCreationAttributes }; 