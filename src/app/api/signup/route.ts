import { NextResponse } from 'next/server';

// Mock database for demonstration
let MOCK_USERS = [
  {
    id: '1',
    email: 'donor@example.com',
    password: 'password123',
    name: 'John Donor',
    role: 'donor',
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (MOCK_USERS.some((user) => user.email === email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Create new user (in a real app, this would be saved to a database)
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email,
      password, // In a real app, this would be hashed
      name,
      role,
    };

    MOCK_USERS.push(newUser);

    // In a real app, you would:
    // 1. Hash the password before storing
    // 2. Generate a verification email
    // 3. Implement proper error handling
    // 4. Add additional security measures

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 