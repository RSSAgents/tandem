import { Box, Button, Container, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <Container className={classes.container}>
      <Box className={classes.block}>
        <Text className={classes.label}>404</Text>
        <Text className={classes.title}>You’ve wandered off the learning path.</Text>
        <Text className={classes.description}>The page you’re looking for doesn’t exist.</Text>
        <Button component={Link} to="/intro" className={classes.btn}>
          Back to learning
        </Button>
      </Box>
    </Container>
  );
};
