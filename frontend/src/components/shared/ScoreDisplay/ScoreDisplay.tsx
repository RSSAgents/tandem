import { Paper, Text, Title } from '@mantine/core';
import styles from './ScoreDisplay.module.css';
import { IScoreDisplayProps } from '@/types/scoreDisplay.types';

export const ScoreDisplay = ({ score, total }: IScoreDisplayProps) => {
  const totalPoints = score * 10;

  return (
    <Paper className={styles.scoreContainer}>
      <Title order={3} className={styles.completedTitle}>
        Test completed!
      </Title>
      <Text className={styles.completedScore}>Your score: {totalPoints} points</Text>
      <Text className={styles.completedScore}>
        Correct answers: {score} out of {total}
      </Text>
    </Paper>
  );
};
