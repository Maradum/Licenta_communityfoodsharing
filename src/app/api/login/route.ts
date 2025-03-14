import { NextResponse } from 'next/server';

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
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user (in a real app, this would query a database)
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // In a real app, you would:
    // 1. Generate a JWT token
    // 2. Set secure HTTP-only cookies
    // 3. Handle password hashing
    // 4. Implement proper session management

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 