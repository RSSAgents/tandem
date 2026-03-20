import { Button, Container, Text, Title } from '@mantine/core';
import classes from './HeroSection.module.css';
import { IconArrowDown } from '@tabler/icons-react';
import { Trans, useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation('hero');

  const scrollToNext = () => {
    const nextSection = document.getElementById('how-it-works');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container className={classes.section}>
      <Title order={1} className={classes.title}>
        <Trans
          i18nKey="title"
          ns="hero"
          components={{ 1: <span className={classes.gradient} /> }}
        />
      </Title>
      <Container p={0} size={600}>
        <Text size="lg" c="dimmed" className={classes.subtitle}>
          {t('subtitle')}
        </Text>
      </Container>
      <Button
        className={classes.learnMoreBtn}
        size="lg"
        variant="default"
        color="gray"
        rightSection={<IconArrowDown size={18} />}
        onClick={scrollToNext}
      >
        {t('learnMore')}
      </Button>
    </Container>
  );
}
