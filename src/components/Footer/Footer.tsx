'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Community Food Sharing
            </h3>
            <p className="text-gray-300 mb-4">
              Connecting communities to reduce food waste and help those in need across the United Kingdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/add-listing" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Add Listing
                </Link>
              </li>
              <li>
                <Link href="/search-listings" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Search Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <a href="tel:+44-XXX-XXXX" className="hover:text-yellow-400 transition-colors">
                  Dial-in: +44-XXX-XXXX
                </a>
              </li>
              <li className="text-gray-300">
                <a href="mailto:help@foodsharing.uk" className="hover:text-yellow-400 transition-colors">
                  help@foodsharing.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Community Food Sharing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 