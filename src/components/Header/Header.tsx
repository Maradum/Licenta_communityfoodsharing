'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.jpg"
              alt="Community Food Sharing"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/locations" 
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              Locations
            </Link>
            <Link 
              href="/chatbot" 
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              ChatGPT
            </Link>
            <Link 
              href="/dial-in" 
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              Dial-in
            </Link>
            <Link 
              href="/login" 
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Login
            </Link>
          </nav>

          {/* Social Media Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
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