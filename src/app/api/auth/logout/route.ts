import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // 🧹 Expire the token cookie manually by setting it with an empty value and a past expiry date
    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.headers.set(
      'Set-Cookie',
      'token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax'
    );

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Error logging out' },
      { status: 500 }
    );
  }
}
