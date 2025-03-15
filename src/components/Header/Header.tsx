'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Button } from '../Button/Button';

export const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Website Name */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.jpg"
              alt="Community Food Sharing"
              width={50}
              height={50}
              className="h-12 w-12 rounded-full"
            />
            <span className="text-xl font-semibold text-gray-900">Community Food Share</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/add-listing" 
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              Share Food
            </Link>
            <Link 
              href="/search-listings" 
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              Find Food
            </Link>
            <Link 
              href="/locations" 
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              Locations
            </Link>
          </nav>

          {/* Right Side: Social Icons and Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
                <FaXTwitter className="w-5 h-5" />
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="primary" size="sm">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 