import { IconCheck } from '@tabler/icons-react';
import { Container, Image, List, Text, ThemeIcon, Title, Stack, Box, Paper } from '@mantine/core';
import img1 from './widget1.jpg';
import img3 from './widget3.jpg';
import classes from './AboutWidgetsSection.module.css';

export function AboutWidgetsSection() {
  return (
    <Container className={classes.container} size="lg" py="xl">
      <Stack className={classes.content} gap="md">
        <Title order={2} className={classes.title}>
          Master <span className={classes.highlight}>JavaScript </span> internals - one widget at a
          time
        </Title>

        <Text c="dimmed" size="lg">
          Master JavaScript internals with hands-on widgets. No more guessing how things work. Solve
          real problems and see immediate results.
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
          <List.Item>
            <Text span fw={700}>
              Stack. Queue. Done.
            </Text>{' '}
            – LIFO/FIFO with visual simulations
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Event Loop questions
            </Text>{' '}
            – predict setTimeout, Promise, and async order
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              'this' keyword
            </Text>{' '}
            – from global context to arrow functions
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Garbage Collection
            </Text>{' '}
            – how memory management works and how to avoid leaks
          </List.Item>
        </List>
      </Stack>

      <Box className={classes.imageContainer}>
        <Paper className={classes.imageWrapper} withBorder={false} radius="md" shadow="xl">
          <Image src={img1} className={classes.image} alt="Event Loop widget" />
          <Text className={classes.imageLabel} size="xs" fw={500}>
            Event Loop
          </Text>
        </Paper>
        <Paper className={classes.imageWrapper} withBorder={false} radius="md" shadow="xl">
          <Image src={img3} className={classes.image} alt="Two Sum widget" />
          <Text className={classes.imageLabel} size="xs" fw={500}>
            Two Sum
          </Text>
        </Paper>
      </Box>
    </Container>
  );
}
