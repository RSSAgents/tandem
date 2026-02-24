import { Container } from '@mantine/core';
import { useState } from 'react';

interface IConsoleTasks {
  id: number;
  code: string;
  options: string[];
  correctSequence: string[];
  explanation?: string;
  topic?: string;
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

export const WidgetConsole = () => {
  const [currentIndex] = useState(0);
  const currentTask = TASKS_DATA[currentIndex];

  return (
    <>
      <Container>{currentTask.code}</Container>
    </>
  );
};
