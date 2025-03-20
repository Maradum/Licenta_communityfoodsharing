import { NextResponse } from 'next/server';
import { User } from '@/server/models/User';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  // Only allow this in development mode
  if (process.env.NODE_ENV !== 'development' && process.env.DEBUG !== 'true') {
    console.log(`Debug endpoint blocked for request to ${request.url}`);
    return NextResponse.json(
      { error: 'Debug endpoint disabled in production' },
      { status: 403 }
    );
  }

  try {
    console.log(`Debug API: Starting debug endpoint for request to ${request.url}`);
    
    // Get all users without exposing passwords
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'role', 'createdAt', 'lastLogin']
    });
    
    // Get specific test user if available
    const testUser = await User.findOne({ 
      where: { email: 'daniel@paas.ro' },
      attributes: ['id', 'email', 'password']
    });
    
    // Create test password hash for testing
    const testPassword = 'test123';
    const salt = await bcrypt.genSalt(10);
    const testHash = await bcrypt.hash(testPassword, salt);
    
    // Run a test password comparison if we have a test user
    let passwordTest = null;
    if (testUser) {
      console.log('Running test password comparison:');
      const compareResult = await bcrypt.compare(testPassword, testHash);
      console.log(`Compare ${testPassword} against new hash: ${compareResult}`);
      
      // Try to validate the stored password 
      const userPassword = testUser.getDataValue('password');
      if (userPassword) {
        passwordTest = {
          actualPasswordMatchesTest: await bcrypt.compare(testPassword, userPassword),
          passwordHashLength: userPassword.length,
          sampleHashLength: testHash.length,
          hashStartsWith: userPassword.substring(0, 10) + '...',
          sampleHashStartsWith: testHash.substring(0, 10) + '...',
        };
      } else {
        passwordTest = {
          error: "User found but password is undefined"
        };
      }
    }
    
    return NextResponse.json({
      status: 'ok',
      databaseConnected: true,
      userCount: users.length,
      users: users.map(u => ({
        id: u.getDataValue('id'),
        email: u.getDataValue('email'),
        name: u.getDataValue('name'),
        role: u.getDataValue('role')
      })),
      passwordTest
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Debug API error', details: String(error) },
      { status: 500 }
    );
  }
} 