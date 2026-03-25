import { Button, Center, Container, Paper, Stack, Text, Title } from '@mantine/core';
import styles from './ErrorDisplay.module.css';

export const ErrorDisplay = ({ error }: { error: string }) => {
  return (
    <Container size={800} className={styles.mainContainer}>
      <Center>
        <Paper p="xl" withBorder radius="md" w={600}>
          <Stack align="center" gap="md">
            <Title order={3} ta="center" c="gray.8">
              Something went wrong
            </Title>
            <Text c="red" ta="center" fz="xl" fw={500}>
              {error}
            </Text>
            <Button onClick={() => window.location.reload()} variant="filled" color="blue">
              Try again
            </Button>
          </Stack>
        </Paper>
      </Center>
    </Container>
  );
};
