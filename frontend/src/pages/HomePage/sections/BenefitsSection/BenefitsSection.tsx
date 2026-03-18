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

const benefits = [
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
    <Container size="lg" py={80}>
      <Group align="center" className={classes.wrapper}>
        <Box className={classes.textBlock}>
          <Title className={classes.title}>
            Why developers <span className={classes.highlight}>love Tandem</span>
          </Title>
          <Text mt="lg" className={classes.description}>
            Everything you need to ace your interview — from real questions to AI-powered practice
            and global competition.
          </Text>
        </Box>
        <SimpleGrid cols={2} spacing="md" className={classes.benefitsGrid}>
          {benefits.map((benefit) => (
            <Paper
              key={benefit.title}
              withBorder
              p="md"
              radius="md"
              className={classes.benefitCard}
            >
              <Group align="center" wrap="nowrap">
                <ThemeIcon
                  size={44}
                  radius="xl"
                  color={benefit.color}
                  variant="light"
                  className={classes.benefitIcon}
                >
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
      </Group>
    </Container>
  );
}
