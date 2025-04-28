import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Sequelize, QueryTypes } from 'sequelize';
import { AppError } from '@/types/error';
import mysql2 from 'mysql2';

// ✅ Setup Sequelize with MySQL
const dbUrl = process.env.DATABASE_URL || 'mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway';
const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',
  dialectModule: mysql2,
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export async function GET(request: NextRequest) {
  try {
    // ✅ Extract token from cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.error('❌ No token provided');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Verify JWT token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key_for_development') as {
        userId: string;
        role: string;
        name: string;
      };
    } catch (error) {
      console.error('❌ Invalid token:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // ✅ Check if user is admin
    if (payload.role !== 'admin') {
      console.error(`❌ Access denied for user ${payload.name} (${payload.userId})`);
      return NextResponse.json({ error: 'Forbidden - Admins only' }, { status: 403 });
    }

    console.log(`✅ Admin verified: ${payload.name} (${payload.userId})`);

    // ✅ Connect to database
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected successfully');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }

    // ✅ Handle pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    console.log(`📦 Fetching users: page=${page}, limit=${limit}, offset=${offset}`);

    // ✅ Query to fetch users
    const usersQuery = `
      SELECT id, name, email, role, status, createdAt, updatedAt, lastLogin
      FROM user
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
    `;
    const countQuery = `SELECT COUNT(*) AS total FROM user`;

    const users = await sequelize.query(usersQuery, {
      replacements: [limit, offset],
      type: QueryTypes.SELECT,
    });

    const countResult = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT,
    });

    const total = (countResult[0] as any).total;

    console.log(`✅ Retrieved ${users.length} users out of ${total}`);

    // ✅ Format users
    const formattedUsers = users.map((user: any) => ({
      _id: user.id,
      ...user,
      createdAt: user.createdAt || new Date().toISOString(),
      lastLogin: user.lastLogin || null,
    }));

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });

  } catch (error: unknown) {
    console.error('❌ Error fetching users:', error);
    const status = error instanceof AppError ? error.status : 500;
    return NextResponse.json({ error: 'Internal server error' }, { status });
  }
}
