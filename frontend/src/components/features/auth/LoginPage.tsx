import { useTheme } from '@hooks/useTheme';
import { ActionIcon, Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './LoginPage.module.css';

export const LoginPage = () => {
  const { handleToggleTheme, isDark } = useTheme();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
    validateInputOnBlur: true,
  });
  const handleSubmit = () => {};

  return (
    <Paper className={classes.card}>
      <ActionIcon
        onClick={handleToggleTheme}
        variant="subtle"
        radius="md"
        size="lg"
        className={classes.themeToggle}
      >
        {isDark ? <IconSun size="1rem" /> : <IconMoon size="1rem" />}
      </ActionIcon>
      <Text className={classes.title}>Tandem</Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          radius="md"
          label="Email"
          placeholder="you@example.com"
          className={classes.input}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          radius="md"
          label="Password"
          placeholder="••••••"
          className={classes.input}
          {...form.getInputProps('password')}
        />
        <Button radius="md" fullWidth type="submit" className={classes.button}>
          LOGIN
        </Button>
      </form>
      <Text size="sm" mt="md" c="dimmed">
        Forgot password?
      </Text>
    </Paper>
  );
};
