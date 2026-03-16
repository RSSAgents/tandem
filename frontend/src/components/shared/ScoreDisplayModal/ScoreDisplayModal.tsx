import { Button, Flex, Modal, Paper, Text, Title } from '@mantine/core';
import styles from './ScoreDisplayModal.module.css';
import { IScoreDisplayProps } from '@/types/scoreDisplay.types';

interface IScoreDisplayModalProps extends IScoreDisplayProps {
  opened: boolean;
  onClose: () => void;
  onTryAgain: () => void;
}

export const ScoreDisplayModal = ({
  score,
  total,
  opened,
  onClose,
  onTryAgain,
}: IScoreDisplayModalProps) => {
  const totalPoints = score * 10;

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
        <Text className={styles.completedScore}>Your score: {totalPoints} points</Text>
        <Text className={styles.completedScore}>
          Correct answers: {score} out of {total}
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
