import { Box, Container, Text, Title } from '@mantine/core';
import classes from './Stack.module.css';

const StackWidget = () => {
  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1}>
        Stack
      </Title>
      <Box className={classes.block}>
        <Box className={classes.container_lifo}>
          <Box className={classes.books}>
            <Box className={classes.book}>
              <Text>5</Text>
            </Box>
            <Box className={classes.book}>
              <Text>4</Text>
            </Box>
            <Box className={classes.book}>
              <Text>3</Text>
            </Box>
            <Box className={classes.book}>
              <Text>2</Text>
            </Box>
            <Box className={classes.book}>
              <Text>1</Text>
            </Box>
          </Box>
          <Box className={classes.cup}></Box>
        </Box>
        <Box className={classes.container_fifo}>
          <Box className={classes.cup}></Box>
          <Box className={classes.books}>
            <Box className={classes.book}>
              <Text>5</Text>
            </Box>
            <Box className={classes.book}>
              <Text>4</Text>
            </Box>
            <Box className={classes.book}>
              <Text>3</Text>
            </Box>
            <Box className={classes.book}>
              <Text>2</Text>
            </Box>
            <Box className={classes.book}>
              <Text>1</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StackWidget;
