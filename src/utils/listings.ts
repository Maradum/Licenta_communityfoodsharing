import { Listing, ExpiryTime, FoodType } from '@/types/listing';
import listingsData from '@/data/listings.json';

// Type assertion to ensure the JSON data matches our Listing type
const typedListings = listingsData.listings.map(listing => ({
  ...listing,
  expiry: listing.expiry as ExpiryTime,
  category: listing.category as Listing['category'],
  foodType: listing.foodType as FoodType
}));

export const getAllListings = (): Listing[] => {
  return typedListings;
};

export const getRecentListings = (limit: number = 6): Listing[] => {
  return typedListings
    .filter(listing => listing.isAvailable)
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

export const getListingsByCategory = (category: Listing['category']): Listing[] => {
  return typedListings.filter(listing => listing.category === category);
};

export const searchListings = (params: {
  search?: string;
  location?: string;
  category?: Listing['category'];
  foodType?: FoodType;
  expiry?: ExpiryTime;
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

    const matchesExpiry = !params.expiry ||
      listing.expiry === params.expiry;

    return matchesSearch && matchesLocation && matchesCategory && matchesFoodType && matchesExpiry;
  });
}; 