import { signIn } from '@/api/auth.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { LoginErrorKeys, LoginFormValues, loginSchema } from './login.schema';
import classes from './LoginPage.module.css';
import { delay } from '@/utils/delay';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null);
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.card}>
        <Text size="2xl" fw={500} ta="center" mb="xl">
          {t('login')}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label={t('email')}
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message ? t(errors.email.message as LoginErrorKeys) : undefined}
            mb="lg"
          />

          <PasswordInput
            label={t('password')}
            placeholder="••••••"
            {...register('password')}
            error={
              errors.password?.message ? t(errors.password.message as LoginErrorKeys) : undefined
            }
            mb="xl"
          />

          {serverError && (
            <Text c="red" size="sm" mb="sm" ta="center">
              {serverError}
            </Text>
          )}

          <Button type="submit" fullWidth loading={isSubmitting} color="blue">
            {t('login')}
          </Button>
        </form>

        <Text size="sm" mt="lg" ta="center">
          {t('noAccount')}{' '}
          <Text className={classes.signupLink} component={Link} to="/register">
            {t('signup')}
          </Text>
        </Text>
      </Paper>
    </div>
  );
};

export default LoginPage;
