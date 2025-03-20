import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
    
    // Get password using getDataValue to avoid Sequelize getter/setter issues
    const userPassword = user.getDataValue('password');
    
    if (!userPassword) {
      console.error('Password is undefined for user:', email);
      return NextResponse.json(
        { error: 'Account authentication issue' },
        { status: 500 }
      );
    }
    
    console.log('Password length:', userPassword.length);
    
    // For the users already in the database with plaintext passwords
    // We need to handle both hashed and plaintext passwords
    let isMatch = false;
    
    // Check if the password looks like a bcrypt hash (starts with $2a$ or $2b$)
    if (userPassword.startsWith('$2a$') || userPassword.startsWith('$2b$')) {
      // It's a hash, use bcrypt compare
      try {
        console.log('Comparing with bcrypt...');
        isMatch = await bcrypt.compare(password, userPassword);
      } catch (err) {
        console.error('Error during bcrypt comparison:', err);
      }
    } else {
      // It's probably plaintext, do direct comparison
      console.log('Comparing with direct equality...');
      isMatch = password === userPassword;
      
      // If match, we should update to hashed password
      if (isMatch) {
        console.log('Converting plaintext password to hash...');
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          
          // Update user password to hashed version using setDataValue
          user.setDataValue('password', hashedPassword);
          await user.save();
          console.log('Password converted to hash for future security');
        } catch (err) {
          console.error('Error updating to hashed password:', err);
          // Continue anyway, login should still work
        }
      }
    }
    
    console.log('Password match result:', isMatch);

    if (!isMatch) {
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