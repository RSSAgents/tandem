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
import { Trans, useTranslation } from 'react-i18next';

const ICONS = [IconBolt, IconTarget, IconRobot, IconTrophy, IconChartBar, IconFlame];

const COLORS = ['blue', 'green', 'violet', 'yellow', 'orange', 'red'];

export function BenefitsSection() {
  const { t } = useTranslation('benefits');

  const benefits = t('benefits', { returnObjects: true }) as Array<{
    key: string;
    title: string;
    description: string;
  }>;

  return (
    <Container className={classes.section} size="lg" py={{ base: 60, sm: 80, md: 100 }}>
      <Box className={classes.textBlock}>
        <Title
          order={2}
          className={classes.sectionTitle}
          fz={{ base: 32, sm: 36, md: 40, lg: 48 }}
          mb={{ base: 16, sm: 18, md: 20, lg: 24 }}
        >
          <Trans
            i18nKey="title"
            ns="benefits"
            components={{ 1: <span className={classes.highlight} /> }}
          />
        </Title>
        <Text c="dimmed" className={classes.sectionDescription}>
          {t('subtitle')}
        </Text>
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" className={classes.benefitsGrid}>
        {benefits.map((benefit, index) => {
          const Icon = ICONS[index];
          const color = COLORS[index];
          return (
            <Paper key={benefit.key} withBorder p="md" radius="md" className={classes.benefitCard}>
              <Group align="center" wrap="nowrap">
                <ThemeIcon size={44} radius="xl" color={color} variant="light">
                  <Icon size={24} stroke={1.5} />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="lg">
                    {benefit.title}
                  </Text>
                  <Text size="lg" c="dimmed">
                    {benefit.description}
                  </Text>
                </Box>
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
