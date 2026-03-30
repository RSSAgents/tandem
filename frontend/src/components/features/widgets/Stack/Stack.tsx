import { saveStackScore } from '@/api/widgetStack.api';
import { ErrorDisplay } from '@/components/shared/ErrorDisplay/ErrorDisplay';
import { PageLoader } from '@/components/shared/PageLoader/PageLoader';
import { FEEDBACK_DELAY } from '@/constants/stack';
import { useStackAnimation } from '@/hooks/useWidgetStack';
import { Box, Container, Group, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FifoQuiz from './FifoQuiz';
import LifoQuiz from './LifoQuiz';
import classes from './Stack.module.css';
import StackVisualization from './StackVisualization';

const StackWidget = () => {
  const { t } = useTranslation('stack');
  const { stack, queue, quizState, setQuizState, runLifoDemo, runFifoDemo, loading, error } =
    useStackAnimation();
  const [selectedLifo, setSelectedLifo] = useState<string>('');
  const [selectedFifo, setSelectedFifo] = useState<string>('');
  const [showLifoFeedback, setShowLifoFeedback] = useState(false);
  const [showFifoFeedback, setShowFifoFeedback] = useState(false);
  const [widgetScore, setWidgetScore] = useState(0);

  useEffect(() => {
    if (quizState === 'completed' && widgetScore > 0) {
      saveStackScore(widgetScore);
    }
  }, [quizState, widgetScore]);

  const handleLifoAnswer = () => {
    setShowLifoFeedback(true);

    if (selectedLifo === 'correct') {
      const newScore = widgetScore + 10;
      setWidgetScore(newScore);

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

      setTimeout(() => {
        setQuizState('fifo-animation');
        setShowFifoFeedback(false);
        runFifoDemo();
      }, FEEDBACK_DELAY);
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} />;

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
            <Text className={classes.completedText}>{t('stackQueue.feedback.completed')}</Text>
          </Box>
        )}
      </Group>

      <StackVisualization stack={stack} queue={queue} quizState={quizState} />
    </Container>
  );
};

export default StackWidget;
