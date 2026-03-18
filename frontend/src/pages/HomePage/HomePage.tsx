import { AboutAISection } from './sections/AboutAISection/AboutAISection';
import { AboutWidgetsSection } from './sections/AboutWidgetsSection/AboutWidgetsSection';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection/HowItWorksSection';
import { LeaderboardSection } from './sections/LeaderboardSection/LeaderboardSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <AboutWidgetsSection />
      <AboutAISection />
      <LeaderboardSection />
    </>
  );
}
