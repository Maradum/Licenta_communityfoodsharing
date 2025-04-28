'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

interface User {
  name: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Function to check authentication status
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
    }
  };

  // Check auth when component mounts or pathname changes
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.jpg"
                alt="Community Food Sharing"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full"
              />
              {/* Removed text duplication from the image */}
              <span className="text-xl font-semibold text-gray-900">
                Community Food Share
              </span>
            </Link>
          </div>

          {/* Main navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-yellow-500 transition-colors">
              About Us
            </Link>
            <Link href="/add-listing" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Share Food
            </Link>
            <Link href="/search-listings" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Find Food
            </Link>
            <Link href="/locations" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Locations
            </Link>
          </div>

          {/* Right section: social media + auth */}
          <div className="flex items-center space-x-6">
            {/* Social media icons */}
            <div className="hidden md:flex items-center space-x-4">
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

            {/* Auth: User greeting or Sign In / Sign Up */}
            <div className="flex items-center space-x-4">
            {user ? (
  <>
    <Link
      href={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}
      className="flex items-center space-x-2 text-gray-700 hover:text-yellow-500 transition-colors"
    >
      <span className="text-sm text-gray-500">Hello,</span>
      <span className="font-medium">
        {user.name || 'User'}
        {user.role ? ` (${user.role.charAt(0).toUpperCase() + user.role.slice(1)})` : ''}
      </span>
    </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-yellow-500 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu icon (not functional yet) */}
            <button className="md:hidden">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
