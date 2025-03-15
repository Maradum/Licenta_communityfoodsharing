import { Listing, ListingDuration, FoodType, FoodCategory } from '@/types/listing';
import listingsData from '@/data/listings.json';

// Type assertion to ensure the JSON data matches our Listing type
const typedListings = listingsData.listings.map(listing => {
  const { foodExpiry, ...rest } = listing;
  return {
    ...rest,
    listingDuration: listing.listingDuration as ListingDuration,
    category: listing.category as FoodCategory,
    foodType: listing.foodType as FoodType,
    foodExpiry: foodExpiry ? {
      ...foodExpiry,
      type: foodExpiry.type as FoodType
    } : undefined
  } as Listing;
});

export const getAllListings = (): Listing[] => {
  return typedListings;
};

export const getRecentListings = (limit: number = 6): Listing[] => {
  return typedListings
    .filter(listing => listing.available)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getListingBySlug = (slug: string): Listing | undefined => {
  return typedListings.find(listing => listing.slug === slug);
};

export const getListingsByLocation = (location: string): Listing[] => {
  return typedListings.filter(
    listing => listing.location.toLowerCase() === location.toLowerCase()
  );
};

export const getListingsByCategory = (category: FoodCategory): Listing[] => {
  return typedListings.filter(listing => listing.category === category);
};

export const searchListings = (params: {
  search?: string;
  location?: string;
  category?: FoodCategory;
  foodType?: FoodType;
  listingDuration?: ListingDuration;
}): Listing[] => {
  return typedListings.filter(listing => {
    const matchesSearch = !params.search || 
      listing.title.toLowerCase().includes(params.search.toLowerCase()) ||
      listing.description.toLowerCase().includes(params.search.toLowerCase());

    const matchesLocation = !params.location || 
      listing.location.toLowerCase() === params.location.toLowerCase();

    const matchesCategory = !params.category || 
      listing.category === params.category;

    const matchesFoodType = !params.foodType ||
      listing.foodType === params.foodType;

    const matchesListingDuration = !params.listingDuration ||
      listing.listingDuration === params.listingDuration;

    return matchesSearch && matchesLocation && matchesCategory && matchesFoodType && matchesListingDuration;
  });
}; 