'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type ListingDuration } from '@/types/listing';

export default function AddListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement form submission
    setLoading(false);
    router.push('/search-listings');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-yellow-600">Add New Listing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g., Fresh Vegetables Bundle"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Describe your food items in detail"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select a category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="canned">Canned Food</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g., London"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="+44 XXXX XXXXXX"
            />
          </div>
        </div>

        {/* Food Details */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Food Details</h2>
          
          <div>
            <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-1">
              Food Type *
            </label>
            <select
              id="foodType"
              name="foodType"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select food type</option>
              <option value="perishable">Perishable</option>
              <option value="non-perishable">Non-perishable</option>
            </select>
          </div>

          <div>
            <label htmlFor="listingDuration" className="block text-sm font-medium text-gray-700 mb-1">
              Collection Timeline *
            </label>
            <select
              id="listingDuration"
              name="listingDuration"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select duration</option>
              <option value="1 day">Within 1 day</option>
              <option value="3 days">Within 3 days</option>
              <option value="1 week">Within 1 week</option>
            </select>
          </div>

          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="expiryNote" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Note
            </label>
            <input
              type="text"
              id="expiryNote"
              name="expiryNote"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g., Best if consumed within 3 days"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Image</h2>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image *
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
} 