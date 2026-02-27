import { useState } from 'react';
import styles from './WidgetConsole.module.css';
import { Button, Flex, Paper, Stack, Title, Text, Container } from '@mantine/core';
import { useSortable } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useSensor,
} from '@dnd-kit/core';
import { shuffleArray } from '@/utils/shuffleArray';
import { IConsoleTasks } from '@/types/widgetConsole';
import { ISortableItemProps } from '@/types/sortable';

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

function SortableItem({ value }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: value });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Text className={styles.dndItem}>{value}</Text>
    </div>
  );
}

export const WidgetConsole = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTask = TASKS_DATA[currentIndex];
  const [items, setItems] = useState(shuffleArray(currentTask.options));
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => item === active.id);
    const newIndex = items.findIndex((item) => item === over.id);

    const newItems = [...items];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);

    setItems(newItems);
  };

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
    if (currentIndex < TASKS_DATA.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextTask = TASKS_DATA[currentIndex + 1];

      setCurrentIndex(nextIndex);
      setItems(shuffleArray(nextTask.options));
      setShowResult(false);
      setIsCorrect(false);
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
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <Stack className={styles.sortableStack}>
                {items.map((item, index) => (
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
            onClick={() => handleCheckResult(items, currentTask.correctSequence)}
          >
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
          <Paper className={styles.scoreContainer}>
            <Title order={3} className={styles.completedTitle}>
              Test completed!
            </Title>
            <Text className={styles.completedScore}>
              Your score: {score}/{currentIndex + 1}
            </Text>
          </Paper>
        )}
      </Container>
    </>
  );
};
