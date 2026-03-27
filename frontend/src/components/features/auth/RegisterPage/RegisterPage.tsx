import { signUp, resetPassword } from '@/api/auth.api';
import { Button, Paper, PasswordInput, Text, TextInput, Anchor } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { registerSchema, RegisterFormValues, RegisterErrorKeys } from './register.schema';
import classes from './RegisterPage.module.css';

const RegisterPage = () => {
  const { t } = useTranslation('auth');
  const [errorKey, setErrorKey] = useState<
    'errors.emailAlreadyExists' | 'errors.usernameAlreadyExists' | 'errors.registrationFailed' | null
  >(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetSentTo, setResetSentTo] = useState<string | null>(null);
  const [lastEmail, setLastEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setErrorKey(null);
      setResetSentTo(null);
      setLastEmail(data.email);
      await signUp(data.email, data.password, data.name);
      setIsSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'EMAIL_ALREADY_EXISTS') {
        setErrorKey('errors.emailAlreadyExists');
      } else if (message === 'USERNAME_ALREADY_EXISTS') {
        setErrorKey('errors.usernameAlreadyExists');
      } else {
        setErrorKey('errors.registrationFailed');
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(lastEmail);
      setResetSentTo(lastEmail);
      setErrorKey(null);
    } catch {
      setErrorKey('errors.registrationFailed');
    }
  };

  if (isSuccess) {
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.card}>
          <Text size="xl" fw={500} ta="center" mb="lg">
            {t('headers.signup')}
          </Text>
          <Text ta="center" mb="xl">
            {t('messages.confirmEmailSent')}
          </Text>
          <Button fullWidth component={Link} to="/login">
            {t('headers.login')}
          </Button>
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.card}>
        <Text size="2xl" fw={500} ta="center" mb="xl">
          {t('headers.signup')}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label={t('fields.name')}
            placeholder="Your name"
            {...register('name')}
            error={errors.name?.message ? t(errors.name.message as RegisterErrorKeys) : undefined}
            mb="lg"
          />

          <TextInput
            label={t('fields.email')}
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message ? t(errors.email.message as RegisterErrorKeys) : undefined}
            mb="lg"
          />

          <PasswordInput
            label={t('fields.password')}
            placeholder="••••••"
            {...register('password')}
            error={
              errors.password?.message ? t(errors.password.message as RegisterErrorKeys) : undefined
            }
            mb="lg"
          />

          <PasswordInput
            label={t('fields.confirmPassword')}
            placeholder="••••••"
            {...register('confirmPassword')}
            error={
              errors.confirmPassword?.message
                ? t(errors.confirmPassword.message as RegisterErrorKeys)
                : undefined
            }
            mb="xl"
          />

          {errorKey && (
            <Text c="red" size="sm" mb="sm" ta="center">
              {t(errorKey)}
            </Text>
          )}

          {errorKey === 'errors.emailAlreadyExists' && !resetSentTo && (
            <Anchor
              component="button"
              type="button"
              size="sm"
              ta="center"
              display="block"
              mb="sm"
              onClick={handleResetPassword}
            >
              {t('messages.wantResetPassword')}
            </Anchor>
          )}

          {resetSentTo && (
            <Text c="green" size="sm" mb="sm" ta="center">
              {t('messages.resetEmailSent', { email: resetSentTo })}
            </Text>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            {t('actions.signup')}
          </Button>
        </form>

        <Text mt="lg" size="sm" ta="center">
          {t('links.alreadyHaveAccount')}{' '}
          <Text className={classes.signinLink} component={Link} to="/login">
            {t('headers.login')}
          </Text>
        </Text>
      </Paper>
    </div>
  );
};

export default RegisterPage;
