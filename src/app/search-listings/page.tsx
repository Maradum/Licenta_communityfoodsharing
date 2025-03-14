'use client';

import { useState } from 'react';
import { Card } from '@/components/Card/Card';
import { Input, Select } from '@/components/Form/Form';
import { Button } from '@/components/Button/Button';

const CITIES = [
  { value: '', label: 'All Locations' },
  { value: 'london', label: 'London' },
  { value: 'manchester', label: 'Manchester' },
  { value: 'birmingham', label: 'Birmingham' },
  { value: 'glasgow', label: 'Glasgow' },
  { value: 'leeds', label: 'Leeds' },
  { value: 'liverpool', label: 'Liverpool' },
];

const EXPIRY_OPTIONS = [
  { value: '', label: 'All Expiry Times' },
  { value: '1 day', label: '1 Day' },
  { value: '3 days', label: '3 Days' },
  { value: '1 week', label: '1 Week' },
];

// Mock data for demonstration
const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    description: 'Carrots, broccoli, spinach from local farm.',
    expiry: '1 day' as const,
    location: 'london',
    postedBy: 'Donor User 1',
    imageUrl: '/images/vegetables.jpg'
  },
  {
    id: '2',
    title: 'Baked Goods',
    description: 'Bread, pastries from local bakery.',
    expiry: '3 days' as const,
    location: 'manchester',
    postedBy: 'Donor User 2',
    imageUrl: '/images/bakery.jpg'
  },
  {
    id: '3',
    title: 'Canned Foods',
    description: 'Various canned goods with long shelf life.',
    expiry: '1 week' as const,
    location: 'birmingham',
    postedBy: 'Donor User 3',
    imageUrl: '/images/canned.jpg'
  },
];

export default function SearchListingsPage() {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    expiry: '',
  });

  const [listings, setListings] = useState(MOCK_LISTINGS);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filteredListings = [...MOCK_LISTINGS];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredListings = filteredListings.filter(
        listing =>
          listing.title.toLowerCase().includes(searchLower) ||
          listing.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.location) {
      filteredListings = filteredListings.filter(
        listing => listing.location === filters.location
      );
    }

    if (filters.expiry) {
      filteredListings = filteredListings.filter(
        listing => listing.expiry === filters.expiry
      );
    }

    setListings(filteredListings);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      expiry: '',
    });
    setListings(MOCK_LISTINGS);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow px-5 py-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by title or description"
            />
            <Select
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              options={CITIES}
            />
            <Select
              label="Expiry Time"
              name="expiry"
              value={filters.expiry}
              onChange={handleFilterChange}
              options={EXPIRY_OPTIONS}
            />
            <div className="flex items-end space-x-2">
              <Button
                onClick={applyFilters}
                className="flex-1"
              >
                Apply Filters
              </Button>
              <Button
                variant="secondary"
                onClick={clearFilters}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Food Listings
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({listings.length} items)
            </span>
          </h2>

          {listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No listings found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card
                  key={listing.id}
                  {...listing}
                >
                  <Button size="sm" variant="secondary">
                    Contact Donor
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 