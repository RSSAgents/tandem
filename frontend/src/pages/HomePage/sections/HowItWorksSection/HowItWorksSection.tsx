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
  const TITLE = 'How it works';
  const SUB_TITLE = `Follow the steps, master the skills, and compete with developers worldwide. Your interview
        journey starts here.`;

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
      <Text className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text className={classes.cardSubTitle} c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" className={classes.section}>
      <Title order={2} className={classes.sectionTitle} ta="center" mt="sm">
        {TITLE}
      </Title>
      <Text c="dimmed" className={classes.sectionDescription} ta="center" mb={50}>
        {SUB_TITLE}
      </Text>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {features}
      </SimpleGrid>
    </Container>
  );
}
