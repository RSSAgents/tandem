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
          {t('actions.register')}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label={t('fields.name')}
            {...register('name')}
            error={errors.name?.message ? t(errors.name.message as RegisterErrorKeys) : undefined}
            mb="lg"
          />

          <TextInput
            label={t('fields.email')}
            {...register('email')}
            error={errors.email?.message ? t(errors.email.message as RegisterErrorKeys) : undefined}
            mb="lg"
          />

          <PasswordInput
            label={t('fields.password')}
            {...register('password')}
            error={
              errors.password?.message ? t(errors.password.message as RegisterErrorKeys) : undefined
            }
            mb="lg"
          />

          <PasswordInput
            label={t('fields.confirmPassword')}
            {...register('confirmPassword')}
            error={
              errors.confirmPassword?.message
                ? t(errors.confirmPassword.message as RegisterErrorKeys)
                : undefined
            }
            mb="xl"
          />

          <Button type="submit" fullWidth loading={isSubmitting}>
            {t('actions.register')}
          </Button>
        </form>

        <Text mt="lg" size="sm" ta="center">
          {t('links.alreadyHaveAccount')}{' '}
          <Text className={classes.signinLink} component={Link} to="/login">
            {t('actions.login')}
          </Text>
        </Text>
      </Paper>
    </div>
  );
};

export default RegisterPage;
