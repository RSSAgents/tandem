import { useTheme } from '@hooks/useTheme';
import { ActionIcon, Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from './login.schema';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '@components/layouts/Header/LanguageSwitcher';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { handleToggleTheme, isDark } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async () => {
    navigate('/dashboard');
  };

  return (
    <Paper className={classes.card}>
      <div className={classes.topControls}>
        <LanguageSwitcher />

        <ActionIcon onClick={handleToggleTheme} variant="default" size="xl" radius="md">
          {isDark ? <IconSun size="1rem" /> : <IconMoon size="1rem" />}
        </ActionIcon>
      </div>

      <Text size="2xl" fw={600} ta="center" mb="xl" c="brand.5">
        Tandem
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
          mb="lg"
        />

        <PasswordInput
          label="Password"
          placeholder="••••••"
          {...register('password')}
          error={errors.password?.message}
          mb="xl"
        />

        <Button type="submit" fullWidth loading={isSubmitting}>
          LOGIN
        </Button>
      </form>

      <Text size="sm" mt="lg" c="dimmed">
        Forgot password?
      </Text>
    </Paper>
  );
};
