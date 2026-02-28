import { Paper, Text } from '@mantine/core';
import styles from './ResultDisplay.module.css';
import { IResultDisplayProps } from '@/types/resultMessage.types';

export const ResultDisplay = ({ isCorrect, explanation }: IResultDisplayProps) => {
  return (
    <Paper className={styles.resultContainer}>
      <Text className={isCorrect ? styles.resultCorrect : styles.resultIncorrect}>
        {isCorrect ? '✅ Correct! Well done!' : '❌ Error!'}
      </Text>
      <Text mt="sm" size="sm">
        {explanation}
      </Text>
    </Paper>
  );
};
