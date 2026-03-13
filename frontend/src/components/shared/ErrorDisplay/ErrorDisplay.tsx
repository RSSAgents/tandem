import { Button, Container, Paper, Text } from '@mantine/core';
import styles from './ErrorDisplay.module.css';

export const ErrorDisplay = ({ error }: { error: string }) => {
  return (
    <Container size={800} className={styles.mainContainer}>
      <Paper p="xl" withBorder>
        <Text c="red" ta="center">
          Error: {error}
        </Text>
        <Button onClick={() => window.location.reload()} mt="md" fullWidth>
          Try again
        </Button>
      </Paper>
    </Container>
  );
};
