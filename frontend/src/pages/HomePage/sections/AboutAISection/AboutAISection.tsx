import {
  Container,
  Title,
  Text,
  Paper,
  Image,
  List,
  ThemeIcon,
  Stack,
  useMantineColorScheme,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './AboutAISection.module.css';
import { useTranslation, Trans } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import aiImageDark from './ai-dark.jpg';
import aiImageLight from './ai-light.jpg';

export function AboutAISection() {
  const { colorScheme } = useMantineColorScheme();

  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  const { t } = useTranslation('aboutAI');

  const aiImage = colorScheme === 'dark' ? aiImageDark : aiImageLight;

  const AI_FEATURES = t('features', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <Container className={classes.section} size="lg" py={{ base: 60, sm: 80, md: 100 }}>
      <Paper
        ref={ref}
        className={`${classes.imageWrapper} ${inView ? classes.imageZoom : ''}`}
        withBorder={false}
        radius="md"
        shadow="xl"
      >
        <Image src={aiImage} alt="AI Interviewer interface" className={classes.image} />
      </Paper>
      <Stack>
        <Title
          order={2}
          className={classes.sectionTitle}
          fz={{ base: 32, sm: 36, md: 40, lg: 40 }}
          mb={{ base: 16, sm: 18, md: 20, lg: 24 }}
        >
          <Trans
            i18nKey="title"
            ns="aboutAI"
            components={{ 1: <span className={classes.highlight} /> }}
          />
        </Title>
        <Text c="dimmed" className={classes.sectionDescription}>
          {t('subtitle')}
        </Text>
        <List
          mt={30}
          spacing="sm"
          size="lg"
          icon={
            <ThemeIcon size={22} radius="xl" color="blue" variant="light">
              <IconCheck size={15} stroke={1.5} />
            </ThemeIcon>
          }
        >
          {AI_FEATURES.map((feature, index) => (
            <List.Item key={index}>
              <Text span fw={700}>
                {feature.title}
              </Text>{' '}
              – {feature.description}
            </List.Item>
          ))}
        </List>
      </Stack>
    </Container>
  );
}
