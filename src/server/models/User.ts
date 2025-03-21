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
  /**
   * Verifies if a password matches the hashed password in the user record
   * @param candidatePassword - The password to verify
   * @returns true if the password matches, false otherwise
   */
  public async verifyPassword(candidatePassword: string): Promise<boolean> {
    const hashedPassword = this.getDataValue('password');
    if (!hashedPassword) return false;
    
    try {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
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
        try {
          const password = user.getDataValue('password');
          if (password && !password.startsWith('$2')) {
            // Only hash if password is not already hashed
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.setDataValue('password', hashedPassword);
          }
        } catch (error) {
          console.error('Error hashing password:', error);
          throw error;
        }
      },
      beforeUpdate: async (user: User) => {
        try {
          if ((user as any).changed('password')) {
            const password = user.getDataValue('password');
            if (password && !password.startsWith('$2')) {
              // Only hash if password is not already hashed
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(password, salt);
              user.setDataValue('password', hashedPassword);
            }
          }
        } catch (error) {
          console.error('Error hashing password on update:', error);
          throw error;
        }
      },
    },
  }
);

// Initialize model automatically
sequelize.authenticate()
  .then(() => console.log('MySQL Database Connected'))
  .catch(err => console.error('Error connecting to MySQL:', err));

export type { UserAttributes, UserCreationAttributes }; 