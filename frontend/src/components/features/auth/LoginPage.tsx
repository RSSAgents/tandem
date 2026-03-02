import { useTheme } from '@hooks/useTheme';
import { ActionIcon, Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues, LoginErrorKeys } from './login.schema';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '@components/layouts/Header/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
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
          {isDark ? <IconSun size="1.2rem" /> : <IconMoon size="1.2rem" />}
        </ActionIcon>
      </div>

      <Text size="2xl" fw={600} ta="center" mb="xl" mt="xl" c="brand.5">
        Tandem
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
        <TextInput
          label={t('email')}
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message ? t(errors.email.message as LoginErrorKeys) : undefined}
          mb="lg"
          data-testid="login-email"
        />

        <PasswordInput
          label={t('password')}
          placeholder="••••••"
          {...register('password')}
          error={
            errors.password?.message ? t(errors.password.message as LoginErrorKeys) : undefined
          }
          mb="xl"
          data-testid="login-password"
        />

        <Button type="submit" fullWidth loading={isSubmitting} data-testid="login-submit">
          {t('login')}
        </Button>
      </form>

      <Text size="sm" mt="lg" c="dimmed">
        {t('forgotPassword')}
      </Text>
    </Paper>
  );
};
