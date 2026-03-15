import { Box, Button, Stack as MantineStack, Radio, Text } from '@mantine/core';
import { FEEDBACK_MESSAGES, QUIZ_QUESTIONS } from './Stack.constants';
import classes from './Stack.module.css';

interface LifoQuizProps {
  selectedLifo: string;
  setSelectedLifo: (value: string) => void;
  showLifoFeedback: boolean;
  handleLifoAnswer: () => void;
}

const LifoQuiz = ({ selectedLifo, setSelectedLifo, showLifoFeedback, handleLifoAnswer }: LifoQuizProps) => (
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
        {selectedLifo === 'correct' ? FEEDBACK_MESSAGES.correct : FEEDBACK_MESSAGES.incorrect}
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
);

export default LifoQuiz;
