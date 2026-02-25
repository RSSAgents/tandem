import { Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import classes from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <Paper className={classes.card}>
      <Text className={classes.title}>Tandem</Text>
      <TextInput
        radius="md"
        label="Email"
        placeholder="you@example.com"
        classNames={{ input: classes.input, label: classes.label }}
      />
      <PasswordInput
        radius="md"
        label="Password"
        placeholder="••••••••"
        classNames={{ input: classes.input, label: classes.label }}
      />
      <Button radius="md" className={classes.button} fullWidth>
        LOGIN
      </Button>
      <Text size="sm" mt="md" c="dimmed">
        Forgot password?
      </Text>
    </Paper>
  );
};
