import { DataTypes, Model } from 'sequelize';
import { sequelize } from './User';

interface ListingAttributes {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  condition: string;
  quantity: number;
  unit: string;
  expiresAt: Date;
  status: 'active' | 'claimed' | 'expired';
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Listing extends Model<ListingAttributes> implements ListingAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public location!: string;
  public category!: string;
  public condition!: string;
  public quantity!: number;
  public unit!: string;
  public expiresAt!: Date;
  public status!: 'active' | 'claimed' | 'expired';
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Listing.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'claimed', 'expired'),
      defaultValue: 'active',
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Listing',
    tableName: 'Listings',
    timestamps: true,
  }
);

export type { ListingAttributes }; 