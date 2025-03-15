export type ExpiryTime = '1 day' | '3 days' | '1 week' | 'long shelf life';
export type FoodType = 'perishable' | 'non-perishable';

export interface Listing {
  id: string;
  title: string;
  description: string;
  expiry: ExpiryTime;
  location: string;
  postedBy: string;
  imageUrl: string;
  category: 'vegetables' | 'fruits' | 'bakery' | 'dairy' | 'canned' | 'other';
  createdAt: string;
  slug: string; // For URL-friendly listing paths
  isAvailable: boolean;
  foodType: FoodType;
  // Additional fields that might be useful
  quantity?: string;
  dietaryInfo?: string[];
  allergens?: string[];
} 