import { Box } from '@mantine/core';
import { AboutAISection } from './sections/AboutAISection/AboutAISection';
import { AboutWidgetsSection } from './sections/AboutWidgetsSection/AboutWidgetsSection';
import { AudienceSection } from './sections/AudienceSection/AudienceSection';
import { BenefitsSection } from './sections/BenefitsSection/BenefitsSection';
import { FAQSection } from './sections/FAQSection/FAQSection';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection/HowItWorksSection';
import { LeaderboardSection } from './sections/LeaderboardSection/LeaderboardSection';
import classes from './HomePage.module.css';

export function HomePage() {
  return (
    <Box className={classes.container}>
      <HeroSection />
      <HowItWorksSection />
      <AudienceSection />
      <AboutWidgetsSection />
      <AboutAISection />
      <LeaderboardSection />
      <BenefitsSection />
      <FAQSection />
    </Box>
  );
}
