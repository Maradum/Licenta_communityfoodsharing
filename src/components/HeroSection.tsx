import Image from "next/image";
import Link from 'next/link';
import { Button } from './Button/Button';

export function HeroSection() {
  return (
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
          <div className="relative h-[500px] flex items-center justify-center">
            <Image
              src="/images/food-love.png"
              alt="Community Food Sharing"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 