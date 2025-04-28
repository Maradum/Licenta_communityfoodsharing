import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Token missing' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();

    await db.execute(
      `INSERT INTO AddListings (title, description, categoryId, cityId, userName, phoneNumber, foodType, listingDuration, expiryDate, expiryNote, userId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title,
        body.description,
        parseInt(body.category as string),
        parseInt(body.location as string),
        body.userName,
        body.phoneNumber,
        body.foodType,
        body.listingDuration,
        body.expiryDate,
        body.expiryNote,
        decoded.userId
      ]
    );

    return NextResponse.json({ message: 'Listing created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

