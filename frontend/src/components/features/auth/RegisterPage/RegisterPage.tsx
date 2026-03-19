import { Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormValues, RegisterErrorKeys } from './register.schema';
import classes from './RegisterPage.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async () => {
    navigate('/dashboard');
  };

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
