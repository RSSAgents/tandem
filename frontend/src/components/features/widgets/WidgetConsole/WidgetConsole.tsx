import { useEffect, useState } from 'react';
import styles from './WidgetConsole.module.css';
import { Button, Flex, Paper, Stack, Title, Text, Container } from '@mantine/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { IConsoleTasks } from '@/types/widgetConsole.types';
import { SortableItem } from './SortableItem';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { ScoreDisplay } from '@/components/shared/ScoreDisplay/ScoreDisplay';
import { ResultDisplay } from '@/components/shared/ResultDisplay/ResultDisplay';
import { getWidgetTasks } from '@/api/widgetConsole.api';
import { PageLoader } from '@/components/shared/PageLoader/PageLoader';
import { ErrorDisplay } from '../../../shared/ErrorDisplay/ErrorDisplay';

export const WidgetConsole = () => {
  const [tasks, setTasks] = useState<IConsoleTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentTask = tasks[currentIndex];

  const { userOrder, sensors, handleDragEnd, resetUserOrder } = useDragAndDrop({
    initialOptions: currentTask?.options || [],
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await getWidgetTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (currentTask) {
      resetUserOrder(currentTask.options);
    }
  }, [currentTask, resetUserOrder]);

  const handleCheckResult = (userAnswers: string[], correctAnswers: string[]) => {
    const isCorrect =
      userAnswers.length === correctAnswers.length &&
      userAnswers.every((val, index) => val === correctAnswers[index]);

    setIsCorrect(isCorrect);
    setShowResult(true);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    return isCorrect;
  };

  const handleNextQuestion = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

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
    <>
      <Container size={800} className={styles.mainContainer}>
        <Title order={2} className={styles.questionTitle}>
          In what order will the console.logs appear?
        </Title>
        <Text className={styles.subtitle} c="dimmed">
          Drag the items into the correct order
        </Text>

        <Stack className={styles.widgetContainer}>
          <Paper className={styles.widgetPaper}>
            <pre className={styles.pre}>{currentTask.code}</pre>
          </Paper>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
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
          <Button
            className={styles.btn}
            disabled={showResult}
            onClick={() => handleCheckResult(userOrder, currentTask.correctSequence)}
          >
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
        {showResult && (
          <ResultDisplay isCorrect={isCorrect} explanation={currentTask.explanation} />
        )}

        {currentIndex === tasks.length - 1 && showResult && (
          <ScoreDisplay score={score} total={tasks.length} />
        )}
      </Container>
    </>
  );
};
