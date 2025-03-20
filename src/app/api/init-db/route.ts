import { NextResponse } from 'next/server';
import { User, sequelize } from '@/server/models/User';
import { Listing } from '@/server/models/Listing';

export async function GET() {
  try {
    // Use the models to check database connection and verify the tables exist
    await sequelize.authenticate();
    console.log('Database connection established');
    
    // Verify that models are accessible
    const userCount = await User.count();
    const listingCount = await Listing.count();
    
    console.log('Database models are initialized');
    console.log(`Current counts - Users: ${userCount}, Listings: ${listingCount}`);
    
    return NextResponse.json({ 
      message: 'Database and tables initialized successfully',
      stats: {
        userCount,
        listingCount
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ 
      error: 'Failed to initialize database' 
    }, { status: 500 });
  }
} 