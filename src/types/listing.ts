export type ListingDuration = '1 day' | '3 days' | '1 week';

export type FoodType = 'perishable' | 'non-perishable';

export type FoodCategory = 'vegetables' | 'fruits' | 'bakery' | 'dairy' | 'canned' | 'other';

export interface FoodExpiry {
  type: FoodType;
  expiryDate?: string; // ISO date string, optional
  expiryNote?: string; // e.g., "Best if used within 2 days", "No expiration"
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  listingDuration: ListingDuration;
  location: string;
  postedBy: string;
  imageUrl: string;
  category: FoodCategory;
  foodType: FoodType;
  foodExpiry?: FoodExpiry;
  slug: string;
  createdAt: string;
  available: boolean;
  // Additional fields that might be useful
  quantity?: string;
  dietaryInfo?: string[];
  allergens?: string[];
} 