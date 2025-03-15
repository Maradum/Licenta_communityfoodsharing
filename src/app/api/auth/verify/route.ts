import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const verified = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const payload = verified.payload as { name: string; role: string };

    return NextResponse.json({
      user: {
        name: payload.name,
        role: payload.role
      }
    });
  } catch (error) {
    // Clear invalid token
    const response = NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
    response.cookies.delete('token');
    return response;
  }
} 