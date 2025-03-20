import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { Sequelize, QueryTypes } from 'sequelize';
import { AppError } from '@/types/error';

// Configurarea directă a Sequelize aici pentru a evita probleme de import
const dbUrl = process.env.DATABASE_URL || 'mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway';
const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',
  dialectModule: require('mysql2'), // Specificăm direct modulul
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

export async function GET(request: Request) {
  try {
    // Verify admin authentication
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key_for_development')
      );
      
      const payload = verified.payload as { role?: string };
      if (payload.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized - Admin access required' },
          { status: 403 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    try {
      // Testăm conexiunea la bază
      await sequelize.authenticate();
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
    
    // Get query parameters for filtering
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;
    
    // Query to get users
    const query = `
      SELECT id, name, email, role, status, createdAt, updatedAt, lastLogin
      FROM Users
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
    `;
    
    // Query to get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM Users
    `;
    
    // Execute queries
    let users = await sequelize.query(query, {
      replacements: [limit, offset],
      type: QueryTypes.SELECT
    });
    
    const countResult = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT
    });
    
    const total = (countResult[0] as any).total;

    // Transform user data to match expected format in frontend
    users = users.map((user: any) => ({
      _id: user.id, // Add _id field expected by frontend
      ...user,
      createdAt: user.createdAt || new Date().toISOString(),
      lastLogin: user.lastLogin || null
    }));

    return NextResponse.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    const status = error instanceof AppError ? error.status : 500;
    return NextResponse.json(
      { error: 'Internal server error' },
      { status }
    );
  }
} 