import styles from './WidgetConsole.module.css';
import { Button, Flex, Paper, Stack, Title, Text, Container } from '@mantine/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableItem } from './SortableItem';
import { ScoreDisplay } from '@/components/shared/ScoreDisplay/ScoreDisplay';
import { ResultDisplay } from '@/components/shared/ResultDisplay/ResultDisplay';
import { PageLoader } from '@/components/shared/PageLoader/PageLoader';
import { ErrorDisplay } from '@/components/shared/ErrorDisplay/ErrorDisplay';
import { useWidgetConsole } from '@/hooks/useWidgetConsole';

export const WidgetConsole = () => {
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
  } = useWidgetConsole();

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} />;

  if (!currentTask) {
    return (
      <Container size={800} className={styles.mainContainer}>
        <Text ta="center">No tasks available</Text>
      </Container>
    );
  }

  return (
    <Container size={800} className={styles.mainContainer}>
      <Title order={2} className={styles.questionTitle}>
        In what order will the console.logs appear?
      </Title>
      <Text className={styles.subtitle} c="dimmed">
        Drag the items into the correct order
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
        <Button className={styles.btn} disabled={showResult} onClick={() => handleCheckResult()}>
          Check result
        </Button>
        <Button
          className={styles.btn}
          disabled={!showResult || currentIndex === tasks.length - 1}
          onClick={handleNextQuestion}
        >
          Next question
        </Button>
      </Flex>
      {showResult && <ResultDisplay isCorrect={isCorrect} explanation={explanation} />}

      {currentIndex === tasks.length - 1 && showResult && (
        <ScoreDisplay score={score} total={tasks.length} />
      )}
    </Container>
  );
};
