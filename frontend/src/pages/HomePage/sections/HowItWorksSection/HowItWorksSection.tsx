import { IconBook, IconPuzzle, IconRobot, IconTrophy } from '@tabler/icons-react';
import { Card, Container, Group, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import classes from './HowItWorksSection.module.css';

const howItWorksData = [
  {
    title: 'Arm yourself with theory',
    description:
      'Knowledge base is your library. Read topic breakdowns, explore code examples, and build your foundation before the battle',
    icon: IconBook,
  },
  {
    title: 'Train with widgets',
    description:
      'Solve interactive challenges, sharpen your skills, and earn your first points. Every correct answer = +XP',
    icon: IconPuzzle,
  },
  {
    title: 'Face the AI interviewer',
    description:
      'Test yourself in a real interview format. The AI asks questions — no mercy, no shortcuts',
    icon: IconRobot,
  },
  {
    title: 'Break into the leaderboard',
    description:
      'Compete with thousands of developers worldwide. The more points you earn, the higher you climb. Become #1',
    icon: IconTrophy,
  },
];

export function HowItWorksSection() {
  const theme = useMantineTheme();

  const iconColors = [
    theme.colors.blue[6],
    theme.colors.green[6],
    theme.colors.violet[6],
    theme.colors.yellow[6],
  ];

  const features = howItWorksData.map((feature, index) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <Group justify="space-between" align="flex-start">
        <Text size="xl" fw={700} c="dimmed" className={classes.stepNumber}>
          {index + 1}
        </Text>
        <feature.icon size={50} stroke={1.5} color={iconColors[index]} />
      </Group>
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        How it works
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Follow the steps, master the skills, and compete with developers worldwide. Your interview
        journey starts here.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
