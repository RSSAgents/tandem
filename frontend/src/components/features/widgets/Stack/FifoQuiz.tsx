import { Box, Button, Stack as MantineStack, Radio, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './Stack.module.css';

interface FifoQuizProps {
  selectedFifo: string;
  setSelectedFifo: (value: string) => void;
  showFifoFeedback: boolean;
  handleFifoAnswer: () => void;
}

const FifoQuiz = ({
  selectedFifo,
  setSelectedFifo,
  showFifoFeedback,
  handleFifoAnswer,
}: FifoQuizProps) => {
  const { t } = useTranslation('stack');
  const stackQueue = t('stackQueue', { returnObjects: true });

  return (
    <Box className={classes.quizBox}>
      <Text className={classes.questionText}>{t('stackQueue.queue.title')}</Text>
      <MantineStack className={classes.radioGroup}>
        <Radio
          value="wrong"
          label={stackQueue.queue.options[0]}
          checked={selectedFifo === 'wrong'}
          onChange={(e) => setSelectedFifo(e.currentTarget.value)}
        />
        <Radio
          value="correct"
          label={stackQueue.queue.options[1]}
          checked={selectedFifo === 'correct'}
          onChange={(e) => setSelectedFifo(e.currentTarget.value)}
        />
      </MantineStack>

      <Text
        className={`${classes.feedbackText} ${
          selectedFifo === 'correct' ? classes.feedbackCorrect : classes.feedbackIncorrect
        } ${!showFifoFeedback ? classes.feedbackHidden : ''}`}
      >
        {showFifoFeedback
          ? selectedFifo === 'correct'
            ? stackQueue.feedback.correct
            : stackQueue.feedback.incorrect
          : ' '}
      </Text>

      <Button className={classes.submitButton} disabled={!selectedFifo} onClick={handleFifoAnswer}>
        {t('stackQueue.button')}
      </Button>
    </Box>
  );
};

export default FifoQuiz;
