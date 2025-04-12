'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [catRes, cityRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/cities'),
        ]);

        const categoriesData = await catRes.json();
        const citiesData = await cityRes.json();

        setCategories(categoriesData);
        setCities(citiesData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    }

    fetchInitialData();
  }, []);

useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }
  
    fetchCategories();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.currentTarget);
  
    const listing = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      location: formData.get('location'),
      userName: formData.get('userName'),
      phoneNumber: formData.get('phoneNumber'),
      foodType: formData.get('foodType'),
      listingDuration: formData.get('listingDuration'),
      expiryDate: formData.get('expiryDate'),
      expiryNote: formData.get('expiryNote'),
      // image: formData.get('image') // Image handling to be added separately
    };
  
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });
  
      if (res.ok) {
        router.push('/listings'); // sau /search-listings dacă ai acea pagină
      } else {
        const errorData = await res.json();
        console.error('Failed to create listing:', errorData);
        alert('Error: ' + (errorData.message || 'Failed to create listing.'));
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      alert('Submission failed. Please try again later.');
    } finally {
      setLoading(false);
    }
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
    {categories.map((cat: any) => (
      <option key={cat.id} value={cat.name}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

<select
  id="location"
  name="location"
  required
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
>
  <option value="">Select a city</option>
  {cities.map((city: any) => (
    <option key={city.id} value={city.name}>
      {city.name}
    </option>
  ))}
</select>


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