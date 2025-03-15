'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';
import { type ListingDuration, type FoodExpiry } from '@/types/listing';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
  title: string;
  description: string;
  listingDuration: ListingDuration;
  location: string;
  imageUrl: string;
  foodExpiry?: FoodExpiry;
  children?: ReactNode;
}

const getExpiryColor = (duration: string) => {
  switch (duration) {
    case '1 day':
      return 'text-red-500';
    case '3 days':
      return 'text-orange-500';
    case '1 week':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

export function Card({
  title,
  description,
  listingDuration,
  location,
  imageUrl,
  foodExpiry,
  children
}: CardProps) {
  return (
    <div className={twMerge(
      'bg-white rounded-lg overflow-hidden cursor-pointer',
      'border-2 border-gray-200 hover:border-yellow-400',
      'shadow-lg hover:shadow-xl transition-all duration-200'
    )}>
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 border-t-2 border-yellow-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-600">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4 bg-yellow-50 p-2 rounded-lg">
          <span className={twMerge(
            'text-sm font-medium',
            getExpiryColor(listingDuration)
          )}>
            Collect within: {listingDuration}
          </span>
          <span className="text-sm text-gray-500">{location}</span>
        </div>
        
        {foodExpiry && (
          <div className="text-sm mb-4 bg-gray-50 p-2 rounded-lg">
            <div className="text-gray-700 font-medium">
              {foodExpiry.type === 'perishable' ? (
                <>🕒 Food expires: {foodExpiry.expiryDate && new Date(foodExpiry.expiryDate).toLocaleDateString()}</>
              ) : (
                <>♾️ Non-perishable food</>
              )}
            </div>
            {foodExpiry.expiryNote && (
              <div className="text-gray-600 mt-1">
                ℹ️ {foodExpiry.expiryNote}
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between border-t border-yellow-200 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card; 