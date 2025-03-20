import { NextResponse } from 'next/server';

let isDbInitialized = false;

export async function middleware(request: Request) {
  // Initialize database only once
  if (!isDbInitialized) {
    console.log('Initializing database...');
    // Models will be initialized automatically when imported
    console.log('Models ready for use');
    isDbInitialized = true;
  }
  
  // Using request in log for debugging if needed
  console.log('Middleware processed request to:', request.url);
  
  return NextResponse.next();
} 