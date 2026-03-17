import { AboutWidgetsSection } from './sections/AboutWidgetsSection/AboutWidgetsSection';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection/HowItWorksSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <AboutWidgetsSection />
    </>
  );
}
