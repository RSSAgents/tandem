import { Container, Title, Text, Paper, Image } from '@mantine/core';
import leaderboardImage from './leaderboard.jpg';
import classes from './LeaderboardSection.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

export function LeaderboardSection() {
  const { ref, inView } = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });

  const { t } = useTranslation('leadersHomePage');
  return (
    <Container size="lg" py={{ base: 60, sm: 80, md: 100 }} className={classes.section}>
      <Title
        order={2}
        className={classes.sectionTitle}
        fz={{ base: 32, sm: 36, md: 40, lg: 48 }}
        mb={{ base: 16, sm: 18, md: 20, lg: 24 }}
      >
        <Trans
          i18nKey="title"
          ns="leadersHomePage"
          components={{ 1: <span className={classes.highlight} /> }}
        />
      </Title>
      <Text c="dimmed" className={classes.sectionDescription}>
        {t('subtitle')}
      </Text>
      <Paper
        ref={ref}
        className={`${classes.imageWrapper} ${inView ? classes.imageZoom : ''}`}
        withBorder={false}
        radius="md"
        shadow="xl"
      >
        <Image src={leaderboardImage} alt="Leaderboard" className={classes.image} />
      </Paper>
    </Container>
  );
}
