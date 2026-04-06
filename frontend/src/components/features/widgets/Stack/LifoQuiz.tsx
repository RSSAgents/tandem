import { Box, Button, Stack as MantineStack, Radio, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './Stack.module.css';

interface LifoQuizProps {
  selectedLifo: string;
  setSelectedLifo: (value: string) => void;
  showLifoFeedback: boolean;
  handleLifoAnswer: () => void;
}

const LifoQuiz = ({
  selectedLifo,
  setSelectedLifo,
  showLifoFeedback,
  handleLifoAnswer,
}: LifoQuizProps) => {
  const { t } = useTranslation('stack');
  const stackQueue = t('stackQueue', { returnObjects: true });

  return (
    <Box className={classes.quizBox}>
      <Text className={classes.questionText}>{t('stackQueue.stack.title')}</Text>
      <MantineStack className={classes.radioGroup}>
        <Radio
          value="correct"
          label={stackQueue.stack.options[0]}
          checked={selectedLifo === 'correct'}
          onChange={(e) => setSelectedLifo(e.currentTarget.value)}
        />
        <Radio
          value="wrong"
          label={stackQueue.stack.options[1]}
          checked={selectedLifo === 'wrong'}
          onChange={(e) => setSelectedLifo(e.currentTarget.value)}
        />
      </MantineStack>

      <Text
        className={`${classes.feedbackText} ${
          selectedLifo === 'correct' ? classes.feedbackCorrect : classes.feedbackIncorrect
        } ${!showLifoFeedback ? classes.feedbackHidden : ''}`}
      >
        {showLifoFeedback
          ? selectedLifo === 'correct'
            ? stackQueue.feedback.correct
            : stackQueue.feedback.incorrect
          : ' '}
      </Text>

      <Button className={classes.submitButton} disabled={!selectedLifo} onClick={handleLifoAnswer}>
        {t('stackQueue.button')}
      </Button>
    </Box>
  );
};

export default LifoQuiz;
