import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '@/server/models/User';

// Define user type for the query result
interface UserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  [key: string]: any; // For any other fields
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log(`Login attempt for email: ${email}`);

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user using the User model
    const user = await User.findOne({
      where: { email }
    });
    
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('User found:', user.get('email'));
    
    // Verify password using the User model's method
    const isMatch = await user.verifyPassword(password);
    console.log('Password verification result:', isMatch);
    
    if (!isMatch) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    user.setDataValue('lastLogin', new Date());
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.getDataValue('id'),
        name: user.getDataValue('name'),
        role: user.getDataValue('role')
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Set HTTP-Only cookie with the token
    const response = NextResponse.json({
      user: {
        id: user.getDataValue('id'),
        email: user.getDataValue('email'),
        name: user.getDataValue('name'),
        role: user.getDataValue('role'),
      }
    });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    console.log('Login successful');
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 