'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  title: string;
  description: string;
  expiry: '1 day' | '3 days' | '1 week';
  location: string;
  postedBy: string;
  imageUrl?: string;
  className?: string;
  children?: ReactNode;
}

const getExpiryColor = (expiry: string) => {
  switch (expiry) {
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

export const Card = ({
  title,
  description,
  expiry,
  location,
  postedBy,
  imageUrl,
  className,
  children
}: CardProps) => {
  return (
    <div className={twMerge(
      'bg-white rounded-lg overflow-hidden cursor-pointer',
      'border-2 border-gray-200 hover:border-yellow-400',
      'shadow-lg hover:shadow-xl transition-all duration-200',
      className
    )}>
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 border-t-2 border-yellow-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-600">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4 bg-yellow-50 p-2 rounded-lg">
          <span className={twMerge(
            'text-sm font-medium',
            getExpiryColor(expiry)
          )}>
            Expires in: {expiry}
          </span>
          <span className="text-sm text-gray-500">{location}</span>
        </div>
        
        <div className="flex items-center justify-between border-t border-yellow-200 pt-4">
          <span className="text-sm text-gray-500">
            Posted by: {postedBy}
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card; 