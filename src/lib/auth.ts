import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret-key'; // folosește exact același secret ca la login

export function verifyToken(token: string): { userId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}
