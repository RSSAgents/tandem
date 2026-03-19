import { IconCheck } from '@tabler/icons-react';
import { Container, Image, List, Text, ThemeIcon, Title, Stack, Box, Paper } from '@mantine/core';
import widget1 from './widget1.jpg';
import widget3 from './widget3.jpg';
import classes from './AboutWidgetsSection.module.css';
import { useTranslation, Trans } from 'react-i18next';

export function AboutWidgetsSection() {
  const { t } = useTranslation('aboutWidgets');

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
    <Container className={classes.section} size="lg" py="100">
      <Stack className={classes.content} gap="md">
        <Title order={2} className={classes.sectionTitle}>
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
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl" color="blue" variant="light">
              <IconCheck size={12} stroke={1.5} />
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
        <Paper className={classes.imageWrapper} withBorder={false} radius="md" shadow="xl">
          <Image src={widget1} className={classes.image} alt="Event Loop widget" />
        </Paper>
        <Paper className={classes.imageWrapper} withBorder={false} radius="md" shadow="xl">
          <Image src={widget3} className={classes.image} alt="stack widget" />
        </Paper>
      </Box>
    </Container>
  );
}
