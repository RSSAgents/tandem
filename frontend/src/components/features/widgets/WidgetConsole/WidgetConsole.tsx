import { useState } from 'react';
import styles from './WidgetConsole.module.css';
import { Button, Flex, Paper, Stack, Title, Text, Container } from '@mantine/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { IConsoleTasks } from '@/types/widgetConsole.types';
import { SortableItem } from './SortableItem';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { ScoreDisplay } from '../../../shared/ScoreDisplay';

const TASKS_DATA: IConsoleTasks[] = [
  {
    id: 1,
    code: `console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

Promise.resolve().then(() => {
    console.log(3);
});

console.log(4);`,
    options: ['1', '2', '3', '4'],
    correctSequence: ['1', '4', '3', '2'],
    explanation:
      'Сначала синхронный код (1,4), потом микротаски (Promise - 3), потом макротаски (setTimeout - 2)',
    topic: 'Event Loop',
  },
  {
    id: 2,
    code: `console.log('A');

setTimeout(() => {
    console.log('B');
}, 100);

setTimeout(() => {
    console.log('C');
}, 0);

console.log('D');

Promise.resolve().then(() => {
    console.log('E');
});`,
    options: ['A', 'B', 'C', 'D', 'E'],
    correctSequence: ['A', 'D', 'E', 'C', 'B'],
    explanation:
      'A и D синхронно, затем микротаска E, потом C (setTimeout 0), затем B (setTimeout 100)',
    topic: 'Event Loop с таймерами',
  },
];

export const WidgetConsole = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTask = TASKS_DATA[currentIndex];
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const { userOrder, sensors, handleDragEnd, resetUserOrder } = useDragAndDrop({
    initialOptions: currentTask.options,
  });

  const handleCheckResult = () => {
    const isCorrect = userOrder.every(
      (value, index) => value === currentTask.correctSequence[index],
    );

    setIsCorrect(isCorrect);
    setShowResult(true);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < TASKS_DATA.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextTask = TASKS_DATA[currentIndex + 1];

      setCurrentIndex(nextIndex);
      setShowResult(false);
      setIsCorrect(false);
      resetUserOrder(nextTask.options);
    }
  };

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
          <Button className={styles.btn} disabled={showResult} onClick={handleCheckResult}>
            Check result
          </Button>
          <Button
            className={styles.btn}
            disabled={!showResult || currentIndex === TASKS_DATA.length - 1}
            onClick={handleNextQuestion}
          >
            Next question
          </Button>
        </Flex>
        {showResult && (
          <Paper className={styles.resultContainer}>
            <Text className={isCorrect ? styles.resultCorrect : styles.resultIncorrect}>
              {isCorrect ? '✅ Correct! Well done!' : '❌ Error!'}
            </Text>
            <Text mt="sm" size="sm">
              {currentTask.explanation}
            </Text>
          </Paper>
        )}

        {currentIndex === TASKS_DATA.length - 1 && showResult && (
          <ScoreDisplay score={score} total={TASKS_DATA.length} />
        )}
      </Container>
    </>
  );
};
