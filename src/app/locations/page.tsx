'use client';

import { useEffect, useState } from 'react';
import { citiesData } from '@/data/citiesData';
import Image from 'next/image';
import Link from 'next/link';

interface City {
  id: number;
  name: string;
  description: string;
  activeListings: number;
  activeDonors: number;
  imageUrl: string;
}

export default function LocationsPage() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch('/api/cities');
        const dbCities = await response.json();

        // Merge database cities with additional static data
        const mergedCities = dbCities.map((city: any) => {
          const extra = citiesData.find((c) => c.id === city.id);
          return {
            id: city.id,
            name: city.name,
            description: extra?.description || '',
            activeListings: extra?.activeListings || 0,
            activeDonors: extra?.activeDonors || 0,
            imageUrl: extra?.imageUrl || '',
          };
        });

        setCities(mergedCities);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    }

    fetchCities();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Food Near You</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div key={city.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={city.imageUrl}
              alt={city.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{city.name}</h2>
              <p className="text-gray-600 mb-4">{city.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div>
                  <p>Active Listings</p>
                  <p className="font-bold text-black">{city.activeListings}</p>
                </div>
                <div>
                  <p>Active Donors</p>
                  <p className="font-bold text-black">{city.activeDonors}</p>
                </div>
              </div>
              <Link href={`/search-listings?city=${city.name}`}>
                <button className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500">
                  View Listings
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


