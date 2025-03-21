import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '@/server/models/User';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    console.log(`Signup attempt for email: ${email}`);

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Generate UUID for user ID
    const userId = uuidv4();

    // Create new user and let Sequelize hooks handle password hashing
    console.log('Creating user with ID:', userId);
    const user = await User.create({
      id: userId,
      email,
      password,
      name,
      role
    });

    console.log('User created successfully');

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId,
        name,
        role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Set HTTP-Only cookie with the token
    const response = NextResponse.json({
      user: {
        id: userId,
        email,
        name,
        role,
      },
      success: true,
      redirectTo: '/'
    });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    console.log('Signup successful');
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 