import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-600">About Community Food Sharing</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <Image
            src="/images/food-love.png"
            alt="Community Food Sharing"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            Community Food Sharing is dedicated to reducing food waste while building stronger communities. 
            We connect people who have surplus food with those who can use it, creating a sustainable and 
            supportive network that benefits everyone.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-yellow-600">🌱 Sustainability</h3>
          <p className="text-gray-600">
            By redistributing surplus food, we help reduce waste and its environmental impact, 
            promoting a more sustainable future for our communities.
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-yellow-600">🤝 Community</h3>
          <p className="text-gray-600">
            We foster connections between neighbors, creating a platform where sharing becomes 
            a way to strengthen community bonds.
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-yellow-600">♻️ Zero Waste</h3>
          <p className="text-gray-600">
            Our goal is to minimize food waste by making it easy for people to share surplus 
            food before it goes to waste.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-600">For Donors</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Create an account and list your surplus food</li>
              <li>Specify food type, expiry dates, and collection details</li>
              <li>Connect with people interested in your food items</li>
              <li>Arrange convenient collection times</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-600">For Recipients</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Browse available food listings in your area</li>
              <li>Contact donors through our secure platform</li>
              <li>Collect food at agreed times</li>
              <li>Help reduce food waste in your community</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Join Our Community</h2>
        <p className="text-gray-600 mb-6">
          Whether you're looking to share surplus food or find food in your community, 
          we welcome you to join our growing network of food-sharing enthusiasts.
        </p>
        <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
          Get Started Today
        </button>
      </div>
    </div>
  );
} 