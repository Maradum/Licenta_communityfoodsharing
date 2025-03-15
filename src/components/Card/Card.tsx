'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type ListingDuration, type FoodExpiry } from '@/types/listing';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button/Button';

export interface CardProps {
  title: string;
  description: string;
  listingDuration: ListingDuration;
  location: string;
  imageUrl: string;
  foodExpiry?: FoodExpiry;
  slug: string;
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
  slug,
  children
}: CardProps) {
  return (
    <div className={twMerge(
      'bg-white rounded-lg overflow-hidden',
      'border-2 border-gray-200 hover:border-yellow-400',
      'shadow-lg hover:shadow-xl transition-all duration-200',
      'flex flex-col h-full'
    )}>
      <Link href={`/listing/${slug}`} className="relative h-48 w-full flex-shrink-0 group">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </Link>
      <div className="p-6 border-t-2 border-yellow-400 flex-grow flex flex-col">
        <div className="flex-grow">
          <Link href={`/listing/${slug}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition-colors">{title}</h3>
          </Link>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
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
        </div>
        
        <div className="flex items-center justify-end border-t border-yellow-200 pt-4 mt-4">
          {children}
          <Link href={`/listing/${slug}`}>
            <Button size="sm" variant="primary" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card; 