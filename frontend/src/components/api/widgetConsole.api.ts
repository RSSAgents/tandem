import { IConsoleTasks } from '@/types/widgetConsole.types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const API_URL = import.meta.env.VITE_API_URL;
const endpointUrl = `${API_URL}/tasks`; // should be changed later

const MOCK_TASKS: IConsoleTasks[] = [
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getWidgetTasks = async (): Promise<IConsoleTasks[]> => {
  if (USE_MOCK) {
    await delay(500);
    return MOCK_TASKS;
  }

  const response = await fetch(endpointUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
