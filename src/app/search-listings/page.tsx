'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { searchListings, getAllListings } from '@/utils/listings';
import type { Listing, ExpiryTime, FoodType } from '@/types/listing';
import Link from 'next/link';

export default function SearchListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Listing['category'] | ''>('');
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | ''>('');
  const [selectedExpiry, setSelectedExpiry] = useState<ExpiryTime | ''>('');

  useEffect(() => {
    // Initial load of all listings
    setListings(getAllListings());
  }, []);

  useEffect(() => {
    // Update listings when filters change
    const filteredListings = searchListings({
      search: searchTerm,
      location: selectedLocation,
      category: selectedCategory || undefined,
      foodType: selectedFoodType || undefined,
      expiry: selectedExpiry || undefined,
    });
    setListings(filteredListings);
  }, [searchTerm, selectedLocation, selectedCategory, selectedFoodType, selectedExpiry]);

  // Get unique locations from all listings
  const locations = [...new Set(getAllListings().map(listing => listing.location))];

  const categories: Listing['category'][] = ['vegetables', 'fruits', 'bakery', 'dairy', 'canned', 'other'];
  const foodTypes: FoodType[] = ['perishable', 'non-perishable'];
  const expiryTimes: ExpiryTime[] = ['1 day', '3 days', '1 week'];

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="col-span-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search listings..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            
            {/* Location Filter */}
            <div>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Food Type and Expiry Filters */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type
              </label>
              <div className="flex gap-2">
                {foodTypes.map(type => (
                  <Button
                    key={type}
                    variant={selectedFoodType === type ? 'primary' : 'outline'}
                    size="sm"
                    className={
                      selectedFoodType === type
                        ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                        : 'border-gray-300 hover:border-yellow-400'
                    }
                    onClick={() => setSelectedFoodType(
                      selectedFoodType === type ? '' : type
                    )}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Time
              </label>
              <div className="flex gap-2">
                {expiryTimes.map(time => (
                  <Button
                    key={time}
                    variant={selectedExpiry === time ? 'primary' : 'outline'}
                    size="sm"
                    className={
                      selectedExpiry === time
                        ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                        : 'border-gray-300 hover:border-yellow-400'
                    }
                    onClick={() => setSelectedExpiry(
                      selectedExpiry === time ? '' : time
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  className={
                    selectedCategory === category
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                      : 'border-gray-300 hover:border-yellow-400'
                  }
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? '' : category
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              {...listing}
            >
              <Link href={`/listings/${listing.slug}`}>
                <Button size="sm" variant="primary" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No listings found matching your criteria
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 