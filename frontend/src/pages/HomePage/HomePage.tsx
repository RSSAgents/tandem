import { Button, Container, Text, Title } from '@mantine/core';
import classes from './HomePage.module.css';

export function HomePage() {
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Your Skills. Tracked. Improved. Mastered.</Title>
      <Container p={0} size={600}>
        <Text size="lg" c="dimmed" className={classes.subtitle}>
          Interactive widget-based challenges & AI-powered mock interviews - practice with real
          questions, get instant feedback and track your progress with Tandem
        </Text>
      </Container>
      <Button className={classes.control} size="lg" variant="default" color="gray">
        Learn more
      </Button>
    </Container>
  );
}
