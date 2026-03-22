import { FEEDBACK_DELAY, FEEDBACK_MESSAGES } from '@/constants/stack';
import { useStackAnimation } from '@/hooks/useWidgetStack';
import { Box, Container, Group, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { saveStackScore } from '../../../../api/widgetStack.api';
import FifoQuiz from './FifoQuiz';
import LifoQuiz from './LifoQuiz';
import classes from './Stack.module.css';
import StackVisualization from './StackVisualization';

const StackWidget = () => {
  const { stack, queue, quizState, setQuizState, runLifoDemo, runFifoDemo } = useStackAnimation();
  const [selectedLifo, setSelectedLifo] = useState<string>('');
  const [selectedFifo, setSelectedFifo] = useState<string>('');
  const [showLifoFeedback, setShowLifoFeedback] = useState(false);
  const [showFifoFeedback, setShowFifoFeedback] = useState(false);
  const [widgetScore, setWidgetScore] = useState(0);

  const handleLifoAnswer = () => {
    setShowLifoFeedback(true);
    if (selectedLifo === 'correct') {
      const newScore = widgetScore + 10;
      setWidgetScore(newScore);
      saveStackScore(newScore);

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
      const newScore = widgetScore + 10;
      setWidgetScore(newScore);
      saveStackScore(newScore);

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
          <LifoQuiz
            selectedLifo={selectedLifo}
            setSelectedLifo={setSelectedLifo}
            showLifoFeedback={showLifoFeedback}
            handleLifoAnswer={handleLifoAnswer}
          />
        )}

        {quizState === 'fifo-question' && (
          <FifoQuiz
            selectedFifo={selectedFifo}
            setSelectedFifo={setSelectedFifo}
            showFifoFeedback={showFifoFeedback}
            handleFifoAnswer={handleFifoAnswer}
          />
        )}

        {quizState === 'completed' && (
          <Box className={classes.quizBox}>
            <Text className={classes.completedText}>{FEEDBACK_MESSAGES.completed}</Text>
          </Box>
        )}
      </Group>

      <StackVisualization stack={stack} queue={queue} quizState={quizState} />
    </Container>
  );
};

export default StackWidget;
