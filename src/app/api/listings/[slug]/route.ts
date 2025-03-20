import { NextResponse } from 'next/server';
import listingsData from '@/data/listings.json';
import { Listing } from '@/types/listing';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Type assertion to ensure the JSON data matches our Listing type
    const typedListings = listingsData.listings.map(listing => {
      const { foodExpiry, ...rest } = listing;
      return {
        ...rest,
        foodExpiry: foodExpiry ? {
          ...foodExpiry,
          type: foodExpiry.type
        } : undefined
      } as unknown as Listing;
    });
    
    // Pentru moment vom căuta după ID și apoi după slug
    const listing = typedListings.find(listing => listing.id === slug || listing.slug === slug);
    
    if (!listing) {
      // Dacă nu găsim listingul, returnăm primul din listă pentru demo
      console.log(`Listing with slug/id '${slug}' not found, returning demo listing`);
      return NextResponse.json({ 
        listing: typedListings[0],
        note: "Demo data - requested listing not found"
      });
    }

    return NextResponse.json({ listing });
  } catch (error: unknown) {
    console.error('Error fetching listing:', error);
    
    // În caz de eroare, tot returnăm un listing demo
    const demoListing = listingsData.listings[0];
    const { foodExpiry, ...rest } = demoListing;
    
    return NextResponse.json({ 
      listing: {
        ...rest,
        foodExpiry: foodExpiry ? {
          ...foodExpiry,
          type: foodExpiry.type
        } : undefined,
        note: "Demo data - error occurred"
      } 
    });
  }
} 