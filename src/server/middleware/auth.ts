import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface DecodedToken {
  userId: string;
  name: string;
  role: string;
}

export const auth = async (request: NextRequest) => {
  try {
    // Get token from cookies or authorization header
    const token = request.cookies.get('token')?.value || 
                 request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'No authentication token, access denied' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    
    // Get user from database
    const user = await User.findOne({
      where: { id: decoded.userId },
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    // Return the user
    return { user };
  } catch (error) {
    console.error('Authentication error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { message: 'Token is invalid' },
      { status: 401 }
    );
  }
}; 