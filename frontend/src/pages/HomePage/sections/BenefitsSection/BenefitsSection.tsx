import { Container, Title, Text, SimpleGrid, Group, ThemeIcon, Box, Paper } from '@mantine/core';
import {
  IconBolt,
  IconTarget,
  IconRobot,
  IconTrophy,
  IconChartBar,
  IconFlame,
} from '@tabler/icons-react';
import classes from './BenefitsSection.module.css';

const TITLE = (
  <>
    <span className={classes.highlight}>Why</span> developers love{' '}
    <span className={classes.highlight}> Tandem</span>
  </>
);
const SUB_TITLE = `Everything you need to ace your interview — from real questions to AI-powered practice and global competition
`;

const BENEFITS = [
  {
    icon: IconBolt,
    title: 'Instant feedback',
    description: 'Get immediate explanations on every solution',
    color: 'blue',
  },
  {
    icon: IconTarget,
    title: 'Real questions',
    description: 'From FAANG and top tech companies',
    color: 'green',
  },
  {
    icon: IconRobot,
    title: 'AI interviewer',
    description: 'Adaptive mock interviews',
    color: 'violet',
  },
  {
    icon: IconTrophy,
    title: 'Leaderboard',
    description: 'Compete with developers around the world',
    color: 'yellow',
  },
  {
    icon: IconChartBar,
    title: 'Track progress',
    description: 'See your growth over time',
    color: 'orange',
  },
  {
    icon: IconFlame,
    title: 'Daily challenges',
    description: 'Build a streak and stay motivated',
    color: 'red',
  },
];

export function BenefitsSection() {
  return (
    <Container className={classes.section} size="lg" py="100">
      <Box className={classes.textBlock}>
        <Title order={2} className={classes.sectionTitle}>
          {TITLE}
        </Title>
        <Text c="dimmed" className={classes.sectionDescription}>
          {SUB_TITLE}
        </Text>
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" className={classes.benefitsGrid}>
        {BENEFITS.map((benefit) => (
          <Paper key={benefit.title} withBorder p="md" radius="md" className={classes.benefitCard}>
            <Group align="center" wrap="nowrap">
              <ThemeIcon size={44} radius="xl" color={benefit.color} variant="light">
                <benefit.icon size={24} stroke={1.5} />
              </ThemeIcon>
              <div>
                <Text fw={600} size="md">
                  {benefit.title}
                </Text>
                <Text size="xs" c="dimmed">
                  {benefit.description}
                </Text>
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}
