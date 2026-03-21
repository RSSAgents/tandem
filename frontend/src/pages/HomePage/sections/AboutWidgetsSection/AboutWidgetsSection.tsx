import { IconCheck } from '@tabler/icons-react';
import {
  Container,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
  Stack,
  Box,
  Paper,
  useMantineColorScheme,
} from '@mantine/core';
import consoleImageDark from './console-dark.jpg';
import consoleImageLight from './console-light.jpg';
import stackImageDark from './stack-dark.jpg';
import stackImageLight from './stack-light.jpg';
import classes from './AboutWidgetsSection.module.css';
import { useTranslation, Trans } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

export function AboutWidgetsSection() {
  const { colorScheme } = useMantineColorScheme();
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  const { t } = useTranslation('aboutWidgets');
  const consoleImage = colorScheme === 'dark' ? consoleImageDark : consoleImageLight;
  const stackImage = colorScheme === 'dark' ? stackImageDark : stackImageLight;

  const JS_TOPICS = [
    { key: 'stack', title: t('topics.stack.title'), desc: t('topics.stack.description') },
    {
      key: 'eventLoop',
      title: t('topics.eventLoop.title'),
      desc: t('topics.eventLoop.description'),
    },
    { key: 'this', title: t('topics.this.title'), desc: t('topics.this.description') },
    { key: 'garbage', title: t('topics.garbage.title'), desc: t('topics.garbage.description') },
  ];

  return (
    <Container ref={ref} className={classes.section} size="lg" py={{ base: 60, sm: 80, md: 100 }}>
      <Stack className={classes.content} gap="md">
        <Title
          order={2}
          className={classes.sectionTitle}
          fz={{ base: 32, sm: 36, md: 40, lg: 48 }}
          mb={{ base: 16, sm: 18, md: 20, lg: 24 }}
        >
          <Trans
            i18nKey="title"
            ns="aboutWidgets"
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
          {JS_TOPICS.map((topic, index) => (
            <List.Item key={index}>
              <Text span fw={700}>
                {topic.title}
              </Text>{' '}
              – {topic.desc}
            </List.Item>
          ))}
        </List>
      </Stack>
      <Box className={classes.imageContainer}>
        <Paper
          className={`${classes.imageWrapper} ${inView ? classes.imageZoom : ''}`}
          withBorder={false}
          radius="md"
          shadow="xl"
        >
          <Image src={consoleImage} className={classes.image} alt="Event Loop widget" />
        </Paper>
        <Paper
          className={`${classes.imageWrapper} ${inView ? classes.imageZoom : ''}`}
          withBorder={false}
          radius="md"
          shadow="xl"
        >
          <Image src={stackImage} className={classes.image} alt="stack widget" />
        </Paper>
      </Box>
    </Container>
  );
}
