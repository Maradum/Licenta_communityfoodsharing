'use client';

const STEPS = [
  {
    number: 1,
    title: 'List Your Food',
    description: 'Share your surplus food with the community.'
  },
  {
    number: 2,
    title: 'Connect',
    description: 'Match with people who need your food.'
  },
  {
    number: 3,
    title: 'Share',
    description: 'Arrange pickup and share the food.'
  }
] as const;

export const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl text-gray-900 font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 