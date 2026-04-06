import { Button, Flex, Modal, Paper, Text, Title } from '@mantine/core';
import styles from './ScoreDisplayModal.module.css';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation('scoreDisplayModal');

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
          {t('title')}
        </Title>
        <Text className={styles.completedScore}>{t('yourScore', { points })}</Text>
        <Text className={styles.completedScore}>
          {t('correctAnswers', { correctAnswers, total })}
        </Text>
        <Flex gap="md" mt="xl" justify="center">
          <Button fullWidth onClick={handleTryAgain} className={styles.closeButton} mt="md">
            {t('tryAgain')}
          </Button>
          <Button fullWidth onClick={onClose} className={styles.closeButton} mt="md">
            {t('close')}
          </Button>
        </Flex>
      </Paper>
    </Modal>
  );
};
