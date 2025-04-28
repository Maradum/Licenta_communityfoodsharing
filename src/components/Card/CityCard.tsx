'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface CityCardProps {
  id: number;
  name: string;
  description: string;
  activeListings: number;
  activeDonors: number;
  imageUrl: string;
}

export function CityCard({ id, name, description, activeListings, activeDonors, imageUrl }: CityCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <div className="text-sm text-gray-700 mb-4">
          <p><strong>Active Listings:</strong> {activeListings}</p>
          <p><strong>Active Donors:</strong> {activeDonors}</p>
        </div>
        <Link href={`/search-listings?city=${name}`}>
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded">
            View Listings
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CityCard;
