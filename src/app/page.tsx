import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { HowItWorks } from '@/components/HowItWorks/HowItWorks';
import { getRecentListings } from '@/utils/listings';

export default function Home() {
  const recentListings = getRecentListings(6);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-yellow-400 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Share food to receive love.
              </h1>
              <p className="text-xl text-gray-800 mb-8">
                Join our community in reducing food waste and helping those in need across the UK.
              </p>
              <div className="space-x-4">
                <Link href="/add-listing">
                  <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                    Share Food
                  </Button>
                </Link>
                <Link href="/search-listings">
                  <Button variant="outline" size="lg" className="border-gray-900 text-gray-900 hover:bg-white/20">
                    Find Food
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/hero-image.png"
                alt="Community Food Sharing"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Recent Food Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentListings.map((listing) => (
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
          <div className="mt-12 text-center">
            <Link href="/search-listings">
              <Button variant="outline" size="lg" className="border-yellow-400 text-gray-900 hover:bg-yellow-50">
                View All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />
    </main>
  );
}
