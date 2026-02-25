import { useTheme } from '@hooks/useTheme';
import { ActionIcon, Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './LoginPage.module.css';

export const LoginPage = () => {
  const { handleToggleTheme, isDark } = useTheme();
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
