'use client';

import { useEffect, useState } from 'react';
import type { Listing } from '@/types/listing';
import Image from 'next/image';
import { Button } from '@/components/Button/Button';
import Link from 'next/link';
import { TextToSpeech } from '@/components/TextToSpeech/TextToSpeech';

export default function ListingDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch listing');
        }
        const data = await response.json();
        setListing(data.listing || null);
      } catch (error) {
        console.error('Error fetching listing:', error);
        setListing(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
        <p className="text-gray-600">The listing you're looking for doesn't exist or has been removed.</p>
        <Link href="/search-listings">
          <Button variant="outline" className="border-2 border-gray-200 hover:border-yellow-400">
            Back to Listings
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200">
          {/* Image Section */}
          <div className="relative h-[500px] w-full border-b-2 border-yellow-400">
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                <p className="text-gray-600">Posted by {listing.userName}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="bg-yellow-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Collect within: {listing.listingDuration}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{listing.location}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <TextToSpeech text={`${listing.title}. ${listing.description}`} />
            </div>

            {/* Description */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            {/* Food Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900 capitalize">{listing.category}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900 capitalize">{listing.foodType}</span>
                  </div>
                  {listing.foodExpiry && (
                    <>
                      <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                        <span className="text-gray-600">Expiry Date:</span>
                        <span className="font-medium text-gray-900">
                          {listing.foodExpiry.expiryDate ? 
                            new Date(listing.foodExpiry.expiryDate).toLocaleDateString() : 
                            'Not specified'
                          }
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="text-gray-600">Note:</span>
                        <p className="mt-1 text-gray-900">{listing.foodExpiry.expiryNote}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact {listing.userName}</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    This food item is available for collection in {listing.location}. Please contact {listing.userName}
                    to arrange collection and help reduce food waste in your community.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={() => setShowPhone(!showPhone)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-2 border-transparent"
                    >
                      {showPhone ? listing.phoneNumber : 'Show Phone Number'}
                    </Button>
                    <Button variant="outline" className="w-full border-2 border-gray-200 hover:border-yellow-400">
                      Save for Later
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t-2 border-gray-100 pt-6">
              <Link href="/search-listings">
                <Button variant="outline" className="border-2 border-gray-200 hover:border-yellow-400">
                  ← Back to Listings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 