import { IconCheck } from '@tabler/icons-react';
import { Container, Image, List, Text, ThemeIcon, Title, Stack, Box, Paper } from '@mantine/core';
import widget1 from './widget1.jpg';
import widget3 from './widget3.jpg';
import classes from './AboutWidgetsSection.module.css';

const TITLE = (
  <>
    Master <span className={classes.highlight}>JavaScript </span> internals - one widget at a time
  </>
);
const SUB_TITLE = `Master JavaScript internals with hands-on widgets. No more guessing how things work. Solve real problems and see immediate results.
`;

const JS_TOPICS = {
  'Stack. Queue. Done.': 'LIFO/FIFO with visual simulations',
  'Event Loop questions': 'predict setTimeout, Promise, and async order',
  "'this' keyword": 'from global context to arrow functions',
  'Garbage Collection': 'how memory management works and how to avoid leaks',
};

export function AboutWidgetsSection() {
  return (
    <Container className={classes.section} size="lg" py="100">
      <Stack className={classes.content} gap="md">
        <Title order={2} className={classes.sectionTitle}>
          {TITLE}
        </Title>

        <Text c="dimmed" size="lg">
          {SUB_TITLE}
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
          {Object.entries(JS_TOPICS).map(([bold, text], index) => (
            <List.Item key={index}>
              <Text span fw={700}>
                {bold}
              </Text>{' '}
              – {text}
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
