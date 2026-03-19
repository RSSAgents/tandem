import { Container, Title, Text, Paper, Image } from '@mantine/core';
import leaderboardImage from './leaderboard.jpg';
import classes from './LeaderboardSection.module.css';

const TITLE = (
  <>
    Compete with developers <span className={classes.highlight}>worldwide</span>
  </>
);
const SUB_TITLE = `Solve widgets, ace AI interviews, earn points, and climb the global leaderboard
`;

export function LeaderboardSection() {
  return (
    <Container size="lg" py="150" className={classes.section}>
      <Title order={2} className={classes.sectionTitle}>
        {TITLE}
      </Title>
      <Text c="dimmed" className={classes.sectionDescription}>
        {SUB_TITLE}
      </Text>
      <Paper className={classes.imagePaper} withBorder={false} radius="md" shadow="xl">
        <Image src={leaderboardImage} alt="Leaderboard" className={classes.image} />
      </Paper>
    </Container>
  );
}
