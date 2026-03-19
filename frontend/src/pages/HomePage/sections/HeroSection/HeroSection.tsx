import { Button, Container, Text, Title } from '@mantine/core';
import classes from './HeroSection.module.css';
import { IconArrowDown } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation('hero');

  return (
    <Container className={classes.section}>
      <Title order={1} className={classes.title}>
        {t('title')}
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
      >
        {t('learnMore')}
      </Button>
    </Container>
  );
}
