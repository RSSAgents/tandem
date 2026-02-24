import { useState } from 'react';
import { Button, Container, Flex, Paper, Stack, Title, Text } from '@mantine/core';
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

interface IConsoleTasks {
  id: number;
  code: string;
  options: string[];
  correctSequence: string[];
  explanation?: string;
  topic?: string;
}

interface ISortableItemProps {
  value: string;
  index: number;
}

function SortableItem({ value }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: value });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Text>{value}</Text>
    </div>
  );
}

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

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

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
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  return (
    <>
      <Container>
        <Title order={2}>В какой последовательности выведутся console.log?</Title>
        <Stack>
          <Paper>
            <pre>{currentTask.code}</pre>
          </Paper>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <Stack gap="xs">
                {items.map((item, index) => (
                  <SortableItem key={item} value={item} index={index} />
                ))}
              </Stack>
            </SortableContext>
          </DndContext>

          {showResult && (
            <>
              <Text c={isCorrect ? 'green' : 'red'}>{isCorrect ? '✅ Correct' : '❌ Mistake'}</Text>
              <Text>{currentTask.explanation}</Text>
            </>
          )}
        </Stack>

        <Flex gap="xs">
          <Button
            disabled={showResult}
            onClick={() => handleCheckResult(items, currentTask.correctSequence)}
          >
            Check result
          </Button>
          <Button
            disabled={!showResult || currentIndex === TASKS_DATA.length - 1}
            onClick={handleNextQuestion}
          >
            Next question
          </Button>
        </Flex>

        {currentIndex === TASKS_DATA.length - 1 && (
          <Paper>
            <Title order={3}>Test completed!</Title>
            <Text>Your score: {score}/2</Text>
          </Paper>
        )}
      </Container>
    </>
  );
};
