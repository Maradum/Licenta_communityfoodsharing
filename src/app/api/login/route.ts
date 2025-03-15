import { NextResponse } from 'next/server';
import { connectDB } from '@/server/config/db';
import { User } from '@/server/models/User';
import jwt from 'jsonwebtoken';

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'donor@example.com',
    password: 'password123',
    name: 'John Donor',
    role: 'donor',
  },
  {
    id: '2',
    email: 'beneficiary@example.com',
    password: 'password123',
    name: 'Jane Beneficiary',
    role: 'beneficiary',
  },
];

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        name: user.name,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Set HTTP-Only cookie with the token
    const response = NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
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

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 