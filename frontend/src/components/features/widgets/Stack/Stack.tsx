import { Box, Button, Container, Group, Text, Title } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import classes from './Stack.module.css';

const MotionDiv = motion.div;

const StackWidget = () => {
  const [lifoBooks, setLifoBooks] = useState<number[]>([1, 2, 3, 4, 5]);
  const [fifoBooks, setFifoBooks] = useState<number[]>([1, 2, 3, 4, 5]);
  const [lifoInGlass, setLifoInGlass] = useState<number[]>([]);
  const [fifoInGlass, setFifoInGlass] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const resetAll = () => {
    setLifoBooks([1, 2, 3, 4, 5]);
    setFifoBooks([1, 2, 3, 4, 5]);
    setLifoInGlass([]);
    setFifoInGlass([]);
    setIsAnimating(false);
  };

  const runLifoAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const books = [...lifoBooks];
    setLifoBooks([]);
    setLifoInGlass([]);

    for (let i = books.length - 1; i >= 0; i--) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLifoInGlass((prev: number[]) => [books[i], ...prev]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let i = 0; i < books.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLifoInGlass((prev: number[]) => prev.slice(0, -1));
    }

    resetAll();
  };

  const runFifoAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const books = [...fifoBooks];
    setFifoBooks([]);
    setFifoInGlass([]);

    for (let i = 0; i < books.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setFifoInGlass((prev: number[]) => [...prev, books[i]]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let i = 0; i < books.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setFifoInGlass((prev: number[]) => prev.slice(1));
    }

    resetAll();
  };

  return (
    <Container className={classes.container}>
      <Title order={1} className={classes.title}>
        STACK
      </Title>

      <Group justify="center" gap="xl" mb={50}>
        <Button onClick={runLifoAnimation} size="lg" color="blue" disabled={isAnimating}>
          LIFO
        </Button>
        <Button onClick={runFifoAnimation} size="lg" color="green" disabled={isAnimating}>
          FIFO
        </Button>
      </Group>

      <Box className={classes.block}>
        <Box className={classes.stack}>
          <Text size="xl" fw={700} mb="md">
            LIFO
          </Text>
          <Box className={classes.content}>
            <Box className={classes.glass}>
              <AnimatePresence>
                {lifoInGlass.map((book, index) => (
                  <MotionDiv
                    key={book}
                    className={`${classes.book} ${classes.inGlass}`}
                    initial={{ opacity: 0, x: 50, y: -30 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { type: 'spring', damping: 15 },
                    }}
                    exit={{
                      opacity: 0,
                      x: 50,
                      y: -30,
                      transition: { duration: 0.3 },
                    }}
                    style={{ bottom: `${index * 55 + 10}px` }}
                  >
                    <Text>{book}</Text>
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </Box>

            <Box className={classes.books}>
              <AnimatePresence>
                {lifoBooks.map((book) => (
                  <MotionDiv
                    key={book}
                    className={classes.book}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                  >
                    <Text>{book}</Text>
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </Box>
          </Box>
        </Box>

        <Box className={classes.stack}>
          <Text size="xl" fw={700} mb="md">
            FIFO
          </Text>
          <Box className={classes.content}>
            <Box className={classes.books}>
              <AnimatePresence>
                {fifoBooks.map((book) => (
                  <MotionDiv
                    key={book}
                    className={`${classes.book} ${classes.fifoBook}`}
                    exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                  >
                    <Text>{book}</Text>
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </Box>

            <Box className={classes.glass}>
              <AnimatePresence>
                {fifoInGlass.map((book, index) => (
                  <MotionDiv
                    key={book}
                    className={`${classes.book} ${classes.inGlass} ${classes.fifoBook}`}
                    initial={{ opacity: 0, x: -50, y: -30 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { type: 'spring', damping: 15 },
                    }}
                    exit={{
                      opacity: 0,
                      x: -50,
                      y: -30,
                      transition: { duration: 0.3 },
                    }}
                    style={{ bottom: `${index * 55 + 10}px` }}
                  >
                    <Text>{book}</Text>
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StackWidget;
