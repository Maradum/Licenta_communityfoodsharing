import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Sequelize, QueryTypes } from 'sequelize';
import { AppError } from '@/types/error';
import mysql2 from 'mysql2';

// ✅ Direct Sequelize setup using MySQL dialect
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

export async function GET(request: Request) {
  try {
    // ✅ Extract token from cookie header
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader?.split('token=')[1]?.split(';')[0];

    if (!token) {
      console.log('❌ No authentication token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      // ✅ Verify JWT token
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key_for_development') as {
        userId?: string;
        role?: string;
        name?: string;
      };

      if (payload.role !== 'admin') {
        console.log(`❌ Unauthorized access by user ${payload.name} (${payload.userId}) with role ${payload.role}`);
        return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
      }

      console.log(`✅ Admin ${payload.name} (${payload.userId}) authenticated`);
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
      // ✅ Test DB connection
      await sequelize.authenticate();
      console.log('✅ Database connection successful');
    } catch (error) {
      console.error('❌ Database connection error:', error);
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // ✅ Handle pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    console.log(`📦 Fetching users - page=${page}, limit=${limit}, offset=${offset}`);

    // ✅ Query to fetch users
    const query = `
      SELECT id, name, email, role, status, createdAt, updatedAt, lastLogin
      FROM user
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
    `;

    const countQuery = `SELECT COUNT(*) as total FROM user`;

    const users = await sequelize.query(query, {
      replacements: [limit, offset],
      type: QueryTypes.SELECT,
    });

    const countResult = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT,
    });

    const total = (countResult[0] as any).total;
    console.log(`✅ Retrieved ${users.length} users out of ${total} total`);

    // ✅ Format users for frontend
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