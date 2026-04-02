import { Button, Flex, Modal, Paper, Text, Title } from '@mantine/core';
import styles from './ScoreDisplayModal.module.css';

interface IScoreDisplayModalProps {
  points: number;
  correctAnswers: number;
  total: number;
  opened: boolean;
  onClose: () => void;
  onTryAgain: () => void;
}

export const ScoreDisplayModal = ({
  points,
  correctAnswers,
  total,
  opened,
  onClose,
  onTryAgain,
}: IScoreDisplayModalProps) => {
  const handleTryAgain = () => {
    onTryAgain();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      radius="md"
      withCloseButton={false}
      classNames={{
        content: styles.modalContent,
      }}
    >
      <Paper className={styles.scoreContainer}>
        <Title order={3} className={styles.completedTitle}>
          Test completed!
        </Title>
        <Text className={styles.completedScore}>Your score: {points} points</Text>
        <Text className={styles.completedScore}>
          Correct answers: {correctAnswers} out of {total}
        </Text>
        <Flex gap="md" mt="xl" justify="center">
          <Button fullWidth onClick={handleTryAgain} className={styles.closeButton} mt="md">
            Try again
          </Button>
          <Button fullWidth onClick={onClose} className={styles.closeButton} mt="md">
            Close
          </Button>
        </Flex>
      </Paper>
    </Modal>
  );
};
