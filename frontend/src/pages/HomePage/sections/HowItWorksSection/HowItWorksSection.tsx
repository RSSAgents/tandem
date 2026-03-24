import { Card, Container, Group, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import { IconBook, IconPuzzle, IconRobot, IconTrophy } from '@tabler/icons-react';
import classes from './HowItWorksSection.module.css';
import { useTranslation } from 'react-i18next';

export function HowItWorksSection() {
  const { t } = useTranslation('howItWorks');
  const theme = useMantineTheme();

  const icons = [IconBook, IconPuzzle, IconRobot, IconTrophy];

  const iconColors = [
    theme.colors.blue[6],
    theme.colors.green[6],
    theme.colors.violet[6],
    theme.colors.yellow[6],
  ];

  const steps = t('steps', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const features = steps.map((step, index) => {
    const Icon = icons[index];
    return (
      <Card key={step.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <Group justify="space-between" align="flex-start">
          <Text size="xl" fw={700} c="dimmed" className={classes.stepNumber}>
            {index + 1}
          </Text>
          <Icon size={50} stroke={1.5} color={iconColors[index]} />
        </Group>
        <Text className={classes.cardTitle} mt="md">
          {step.title}
        </Text>
        <Text className={classes.cardSubTitle} c="dimmed" mt="sm">
          {step.description}
        </Text>
      </Card>
    );
  });

  return (
    <Container
      size="lg"
      id="how-it-works"
      className={classes.section}
      py={{ base: 60, sm: 80, md: 100 }}
    >
      <Title
        order={2}
        className={classes.sectionTitle}
        ta="center"
        fz={{ base: 32, sm: 36, md: 40, lg: 48 }}
        mb={{ base: 16, sm: 18, md: 20, lg: 24 }}
      >
        {t('title')}
      </Title>
      <Text c="dimmed" className={classes.sectionDescription} ta="center" mb={50}>
        {t('subtitle')}
      </Text>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {features}
      </SimpleGrid>
    </Container>
  );
}
