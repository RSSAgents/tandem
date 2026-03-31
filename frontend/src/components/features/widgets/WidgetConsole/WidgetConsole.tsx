import { ErrorDisplay } from '@/components/shared/ErrorDisplay/ErrorDisplay';
import { PageLoader } from '@/components/shared/PageLoader/PageLoader';
import { ResultDisplay } from '@/components/shared/ResultDisplay/ResultDisplay';
import { ScoreDisplayModal } from '@/components/shared/ScoreDisplayModal/ScoreDisplayModal';
import { useWidgetConsole } from '@/hooks/useWidgetConsole';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, Container, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import { SortableItem } from './SortableItem';
import styles from './WidgetConsole.module.css';
import { useTranslation } from 'react-i18next';

export const WidgetConsole = () => {
  const { t } = useTranslation('widgetConsole');

  const {
    loading,
    error,
    currentTask,
    showResult,
    isCorrect,
    score,
    explanation,
    tasks,
    currentIndex,
    userOrder,
    sensors,
    handleDragEnd,
    handleCheckResult,
    handleNextQuestion,
    resetWidget,
    saveResult,
  } = useWidgetConsole();

  const [modalOpened, setModalOpened] = useState(false);

  const onCheckClick = useCallback(() => {
    handleCheckResult();

    if (currentIndex === tasks.length - 1) {
      setTimeout(async () => {
        await saveResult();
        setModalOpened(true);
      }, 2000);
    }
  }, [handleCheckResult, saveResult, currentIndex, tasks.length]);

  const handleTryAgain = () => {
    resetWidget();
    setModalOpened(false);
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} />;

  if (!currentTask) {
    return (
      <Container size={800} className={styles.mainContainer}>
        <Text ta="center">{t('noTasks')}</Text>
      </Container>
    );
  }

  return (
    <Container size={800} className={styles.mainContainer}>
      <Title order={2} className={styles.questionTitle}>
        {t('title')}
      </Title>
      <Text className={styles.subtitle} c="dimmed">
        {t('subtitle')}
      </Text>

      <Text className={styles.questionCounter}>
        {t('questionCounter', { current: currentIndex + 1, total: tasks.length })}
      </Text>
      <Stack className={styles.widgetContainer}>
        <Paper className={styles.widgetPaper}>
          <pre className={styles.pre}>{currentTask.payload.code}</pre>
        </Paper>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={userOrder} strategy={verticalListSortingStrategy}>
            <Stack className={styles.sortableStack}>
              {userOrder.map((item, index) => (
                <SortableItem key={item} value={item} index={index} />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>
      </Stack>

      <Flex className={styles.actionButtons}>
        <Button className={styles.btn} disabled={showResult} onClick={onCheckClick}>
          {t('checkButton')}
        </Button>
        <Button
          className={styles.btn}
          disabled={!showResult || currentIndex === tasks.length - 1}
          onClick={handleNextQuestion}
        >
          {t('nextButton')}
        </Button>
      </Flex>
      {showResult && <ResultDisplay isCorrect={isCorrect} explanation={explanation} />}

      <ScoreDisplayModal
        points={score}
        correctAnswers={score / 10}
        total={tasks.length}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onTryAgain={handleTryAgain}
      />
    </Container>
  );
};
