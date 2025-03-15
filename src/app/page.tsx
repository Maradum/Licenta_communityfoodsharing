import { HeroSection } from '@/components/HeroSection';
import { RecentListings } from '@/components/RecentListings';
import { SocialImpact } from '@/components/SocialImpact';
import { BestPractices } from '@/components/BestPractices';
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
