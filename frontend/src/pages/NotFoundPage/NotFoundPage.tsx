import { Box, Button, Container, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classes from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const { t } = useTranslation('notFound');
  return (
    <Container className={classes.container}>
      <Box className={classes.block}>
        <Text className={classes.label}>404</Text>
        <Text className={classes.title}>{t('title')}</Text>
        <Text className={classes.description}>{t('description')}</Text>
        <Button component={Link} to="/dashboard" className={classes.btn}>
          {t('button')}
        </Button>
      </Box>
    </Container>
  );
};
