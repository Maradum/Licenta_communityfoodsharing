import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // your DB connection

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const listing = await db.listing.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(listing);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await db.listing.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updated);
}
