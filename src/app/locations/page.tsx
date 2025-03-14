'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button/Button';

const CITIES = [
  {
    name: 'London',
    image: '/images/london.jpg',
    activeListings: 150,
    activeDonors: 45,
    description: 'The capital leads in food sharing initiatives.',
  },
  {
    name: 'Manchester',
    image: '/images/manchester.jpg',
    activeListings: 85,
    activeDonors: 28,
    description: 'A growing community of food sharing enthusiasts.',
  },
  {
    name: 'Birmingham',
    image: '/images/birmingham.jpg',
    activeListings: 95,
    activeDonors: 32,
    description: 'Strong network of local food donors.',
  },
  {
    name: 'Glasgow',
    image: '/images/glasgow.jpg',
    activeListings: 65,
    activeDonors: 22,
    description: 'Active participation in reducing food waste.',
  },
  {
    name: 'Leeds',
    image: '/images/leeds.jpg',
    activeListings: 55,
    activeDonors: 18,
    description: 'Emerging food sharing community.',
  },
  {
    name: 'Liverpool',
    image: '/images/liverpool.jpg',
    activeListings: 45,
    activeDonors: 15,
    description: 'Growing impact on food waste reduction.',
  },
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Food Sharing Locations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find food sharing opportunities in major cities across the United Kingdom.
            Join our community and help reduce food waste in your area.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CITIES.map((city) => (
            <div
              key={city.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {city.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {city.description}
                </p>
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Active Listings</p>
                    <p className="text-2xl font-bold text-yellow-500">
                      {city.activeListings}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Donors</p>
                    <p className="text-2xl font-bold text-yellow-500">
                      {city.activeDonors}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/search-listings?location=${city.name.toLowerCase()}`}
                  className="block"
                >
                  <Button fullWidth>
                    View Listings
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Don't see your city?
          </h2>
          <p className="text-gray-600 mb-8">
            Help us expand our food sharing network to your area.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Request Your City
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 