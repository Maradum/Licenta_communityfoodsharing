import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      console.log('No token found in cookies');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify the token using jsonwebtoken
    const payload = jwt.verify(token.value, process.env.JWT_SECRET!) as { 
      userId: string;
      name: string; 
      role: string;
      iat: number;
      exp: number;
    };

    console.log('Token verified successfully, user:', payload.name, 'role:', payload.role);

    // Return only name and role to match the original structure expected by Navbar
    return NextResponse.json({
      user: {
        name: payload.name,
        role: payload.role
      }
    });
  } catch (error) {
    // Clear invalid token
    console.error('Token verification error:', error);
    const response = NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
    response.cookies.delete('token');
    return response;
  }
} 