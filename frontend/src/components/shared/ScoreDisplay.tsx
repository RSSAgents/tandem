import { Paper, Title, Text } from '@mantine/core';
import styles from './../features/widgets/WidgetConsole/WidgetConsole.module.css';
import { IScoreDisplayProps } from '@/types/scoreDisplay.types';

export const ScoreDisplay = ({ score, total }: IScoreDisplayProps) => {
  return (
    <Paper className={styles.scoreContainer}>
      <Title order={3} className={styles.completedTitle}>
        Test completed!
      </Title>
      <Text className={styles.completedScore}>
        Your score: {score}/{total}
      </Text>
    </Paper>
  );
};
