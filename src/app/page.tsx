import { HeroSection } from '@/components/HeroSection/HeroSection';
import { RecentListings } from '@/components/RecentListings/RecentListings';
import { SocialImpact } from '@/components/SocialImpact/SocialImpact';
import { BestPractices } from '@/components/BestPractices/BestPractices';
import { HowItWorks } from '@/components/HowItWorks/HowItWorks';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <RecentListings />
      <SocialImpact />
      <BestPractices />
      <HowItWorks />
    </main>
  );
}
