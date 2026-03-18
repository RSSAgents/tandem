import { Container, Title, Text, Paper, Image } from '@mantine/core';
import leaderboardImage from './leaderboard.jpg';
import classes from './LeaderboardSection.module.css';

export function LeaderboardSection() {
  return (
    <Container size="lg" py={80} className={classes.wrapper}>
      <Title order={2} className={classes.title}>
        <span className={classes.highlight}>Compete</span> with developers worldwide
      </Title>

      <Text size="xl" c="dimmed" className={classes.description}>
        Solve widgets, ace AI interviews, earn points, and climb the global leaderboard.
      </Text>

      <Paper withBorder radius="lg" className={classes.imagePaper}>
        <Image src={leaderboardImage} alt="Global leaderboard" className={classes.image} />
      </Paper>
    </Container>
  );
}
