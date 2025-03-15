import Link from 'next/link';
import { Button } from './Button/Button';
import { Card } from './Card/Card';
import { getRecentListings } from '@/utils/listings';

export function RecentListings() {
  const recentListings = getRecentListings(6);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Recent Food Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentListings.map((listing) => (
            <Card
              key={listing.id}
              title={listing.title}
              description={listing.description}
              listingDuration={listing.listingDuration}
              location={listing.location}
              imageUrl={listing.imageUrl}
              foodExpiry={listing.foodExpiry}
            >
              <Link href={`/listings/${listing.slug}`}>
                <Button size="sm" variant="primary" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/search-listings">
            <Button variant="outline" size="lg" className="border-yellow-400 text-gray-900 hover:bg-yellow-50">
              View All Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 