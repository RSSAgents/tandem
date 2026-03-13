import {
  Box,
  Button,
  Container,
  Group,
  Stack as MantineStack,
  Radio,
  Text,
  Title,
} from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import classes from './Stack.module.css';
import {
  QUIZ_QUESTIONS,
  FEEDBACK_MESSAGES,
  ANIMATION_CONFIG,
  QUEUE_ANIMATION_CONFIG,
  FEEDBACK_DELAY,
} from './Stack.constants';
import { useStackAnimation } from './Stack.hooks';

const StackWidget = () => {
  const { stack, queue, quizState, setQuizState, runLifoDemo, runFifoDemo } = useStackAnimation();
  const [selectedLifo, setSelectedLifo] = useState<string>('');
  const [selectedFifo, setSelectedFifo] = useState<string>('');
  const [showLifoFeedback, setShowLifoFeedback] = useState(false);
  const [showFifoFeedback, setShowFifoFeedback] = useState(false);

  const handleLifoAnswer = () => {
    setShowLifoFeedback(true);
    if (selectedLifo === 'correct') {
      setTimeout(() => {
        setQuizState('lifo-animation');
        setShowLifoFeedback(false);
        runLifoDemo();
      }, FEEDBACK_DELAY);
    }
  };

  const handleFifoAnswer = () => {
    setShowFifoFeedback(true);
    if (selectedFifo === 'correct') {
      setTimeout(() => {
        setQuizState('fifo-animation');
        setShowFifoFeedback(false);
        runFifoDemo();
      }, FEEDBACK_DELAY);
    }
  };

  return (
    <Container className={classes.container}>
      <Title className={classes.title}>STACK</Title>

      <Group className={classes.controls}>
        {quizState === 'lifo-question' && (
          <Box className={classes.quizBox}>
            <Text className={classes.questionText}>{QUIZ_QUESTIONS.lifo.question}</Text>
            <MantineStack className={classes.radioGroup}>
              <Radio
                value="correct"
                label={QUIZ_QUESTIONS.lifo.correctAnswer}
                checked={selectedLifo === 'correct'}
                onChange={(e) => setSelectedLifo(e.currentTarget.value)}
              />
              <Radio
                value="wrong"
                label={QUIZ_QUESTIONS.lifo.wrongAnswer}
                checked={selectedLifo === 'wrong'}
                onChange={(e) => setSelectedLifo(e.currentTarget.value)}
              />
            </MantineStack>
            {showLifoFeedback && (
              <Text
                className={`${classes.feedbackText} ${
                  selectedLifo === 'correct' ? classes.feedbackCorrect : classes.feedbackIncorrect
                }`}
              >
                {selectedLifo === 'correct'
                  ? FEEDBACK_MESSAGES.correct
                  : FEEDBACK_MESSAGES.incorrect}
              </Text>
            )}
            <Button
              className={classes.submitButton}
              disabled={!selectedLifo}
              onClick={handleLifoAnswer}
            >
              Submit Answer
            </Button>
          </Box>
        )}

        {quizState === 'fifo-question' && (
          <Box className={classes.quizBox}>
            <Text className={classes.questionText}>{QUIZ_QUESTIONS.fifo.question}</Text>
            <MantineStack className={classes.radioGroup}>
              <Radio
                value="wrong"
                label={QUIZ_QUESTIONS.fifo.wrongAnswer}
                checked={selectedFifo === 'wrong'}
                onChange={(e) => setSelectedFifo(e.currentTarget.value)}
              />
              <Radio
                value="correct"
                label={QUIZ_QUESTIONS.fifo.correctAnswer}
                checked={selectedFifo === 'correct'}
                onChange={(e) => setSelectedFifo(e.currentTarget.value)}
              />
            </MantineStack>
            {showFifoFeedback && (
              <Text
                className={`${classes.feedbackText} ${
                  selectedFifo === 'correct' ? classes.feedbackCorrect : classes.feedbackIncorrect
                }`}
              >
                {selectedFifo === 'correct'
                  ? FEEDBACK_MESSAGES.correct
                  : FEEDBACK_MESSAGES.incorrect}
              </Text>
            )}
            <Button
              className={classes.submitButton}
              disabled={!selectedFifo}
              onClick={handleFifoAnswer}
            >
              Submit Answer
            </Button>
          </Box>
        )}

        {quizState === 'completed' && (
          <Box className={classes.quizBox}>
            <Text className={classes.completedText}>{FEEDBACK_MESSAGES.completed}</Text>
          </Box>
        )}
      </Group>

      <Box className={classes.visualizations}>
        {(quizState === 'lifo-animation' ||
          quizState === 'fifo-question' ||
          quizState === 'fifo-animation' ||
          quizState === 'completed') && (
          <Box className={classes.section}>
            <Text className={classes.sectionTitle}>LIFO</Text>
            <Box className={classes.stackContainer}>
              <AnimatePresence mode="popLayout">
                {stack.map((item) => (
                  <motion.div
                    key={`stack-${item}`}
                    className={classes.stackItem}
                    initial={ANIMATION_CONFIG.initial}
                    animate={ANIMATION_CONFIG.animate}
                    exit={ANIMATION_CONFIG.exit}
                    layout
                  >
                    <Text className={classes.itemText}>{item}</Text>
                  </motion.div>
                ))}
              </AnimatePresence>
              {stack.length === 0 && quizState !== 'lifo-animation' && (
                <Text className={classes.emptyText}>Stack is empty</Text>
              )}
            </Box>
          </Box>
        )}

        {(quizState === 'fifo-animation' || quizState === 'completed') && (
          <Box className={classes.section}>
            <Text className={classes.sectionTitle}>FIFO</Text>
            <Box className={classes.queueContainer}>
              <AnimatePresence mode="popLayout">
                {queue.map((item) => (
                  <motion.div
                    key={`queue-${item}`}
                    className={classes.queueItem}
                    initial={QUEUE_ANIMATION_CONFIG.initial}
                    animate={QUEUE_ANIMATION_CONFIG.animate}
                    exit={QUEUE_ANIMATION_CONFIG.exit}
                    layout
                  >
                    <Text className={classes.itemText}>{item}</Text>
                  </motion.div>
                ))}
              </AnimatePresence>
              {queue.length === 0 && quizState !== 'fifo-animation' && (
                <Text className={classes.emptyText}>Queue is empty</Text>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default StackWidget;
