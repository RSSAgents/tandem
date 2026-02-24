import { Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';

export const LoginPage = () => {
  return (
    <Paper>
      <Text>Tandem</Text>
      <TextInput label="Email" placeholder="you@example.com" />
      <PasswordInput label="Password" placeholder="••••••••" />
      <Button>LOGIN</Button>
      <Text size="sm" mt="md" c="dimmed">
        Forgot password?
      </Text>
    </Paper>
  );
};
