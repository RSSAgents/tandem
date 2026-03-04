import { Box, Container, Title } from '@mantine/core';
import classes from './Stack.module.css';

const StackWidget = () => {
  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1}>
        Stack
      </Title>
      <Box className={classes.block}></Box>
    </Container>
  );
};

export default StackWidget;
