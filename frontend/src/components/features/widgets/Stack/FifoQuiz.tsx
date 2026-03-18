import { FEEDBACK_MESSAGES, QUIZ_QUESTIONS } from '@/constants/stack';
import { Box, Button, Stack as MantineStack, Radio, Text } from '@mantine/core';
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
}: FifoQuizProps) => (
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
        {selectedFifo === 'correct' ? FEEDBACK_MESSAGES.correct : FEEDBACK_MESSAGES.incorrect}
      </Text>
    )}
    <Button className={classes.submitButton} disabled={!selectedFifo} onClick={handleFifoAnswer}>
      Submit Answer
    </Button>
  </Box>
);

export default FifoQuiz;
