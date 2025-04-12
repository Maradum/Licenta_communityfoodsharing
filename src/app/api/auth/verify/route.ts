import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ await is required
    const token = cookieStore.get('token');

    if (!token) {
      console.log('❌ No token found');
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const payload = jwt.verify(token.value, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    console.log('✅ Token verified:', payload);

    return NextResponse.json({ message: 'Authenticated', user: payload });
  } catch (error) {
    console.error('❌ Token verification failed:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
