import { Button, Container, Text, Title } from '@mantine/core';
import classes from './HeroSection.module.css';
import { IconArrowDown } from '@tabler/icons-react';

const TITLE = 'Your Skills. Tracked. Improved. Mastered.';
const SUB_TITLE = `Interactive widget-based challenges & AI-powered mock interviews - practice with real
          questions, get instant feedback and track your progress with Tandem`;
const BTN_TEXT = 'Learn more';

export function HeroSection() {
  return (
    <Container className={classes.section}>
      <Title order={1} className={classes.title}>
        {TITLE}
      </Title>
      <Container p={0} size={600}>
        <Text size="lg" c="dimmed" className={classes.subtitle}>
          {SUB_TITLE}
        </Text>
      </Container>
      <Button
        className={classes.learnMoreBtn}
        size="lg"
        variant="default"
        color="gray"
        rightSection={<IconArrowDown size={18} />}
      >
        {BTN_TEXT}
      </Button>
    </Container>
  );
}
