import { IConsoleAnswer, IConsoleTask } from '@/types/widgetConsole.types';
import { delay } from '@/utils/delay';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const API_URL = import.meta.env.VITE_API_URL;
const endpointUrl = `${API_URL}/tasks`; // should be changed later

const MOCK_TASKS: IConsoleTask[] = [
  {
    id: 'console-001',
    type: 'console-order',
    topic: 'Event Loop',
    difficulty: 2,
    tags: ['microtasks', 'macrotasks', 'promise', 'setTimeout'],
    version: 1,
    payload: {
      code: 'console.log(1);\n\nsetTimeout(() => {\n  console.log(2);\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(3);\n});\n\nconsole.log(4);',
      options: ['1', '2', '3', '4'],
    },
  },
  {
    id: 'console-002',
    type: 'console-order',
    topic: 'Event Loop 2',
    difficulty: 2,
    tags: ['microtasks', 'macrotasks', 'promise', 'setTimeout'],
    version: 2,
    payload: {
      code: "console.log('A');\n\nsetTimeout(() => {\n  console.log('B');\n}, 100);\n\nsetTimeout(() => {\n  console.log('C');\n}, 0);\n\nconsole.log('D');\n\nPromise.resolve().then(() => {\n  console.log('E');\n});",
      options: ['A', 'B', 'C', 'D', 'E'],
    },
  },
];

const MOCK_CORRECT_ANSWERS: Record<string, string[]> = {
  'console-001': ['1', '4', '3', '2'],
  'console-002': ['A', 'D', 'E', 'C', 'B'],
};

export const getWidgetTasks = async (options?: {
  signal?: AbortSignal;
}): Promise<IConsoleTask[]> => {
  if (USE_MOCK) {
    await delay(500);

    if (options?.signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    return MOCK_TASKS;
  }

  const response = await fetch(endpointUrl, {
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const checkWidgetAnswer = async (
  answer: IConsoleAnswer,
): Promise<{
  isCorrect: boolean;
  score: number;
  explanation?: string;
}> => {
  if (USE_MOCK) {
    await delay(300);

    const correctSequence = MOCK_CORRECT_ANSWERS[answer.taskId];

    if (correctSequence) {
      const isCorrect = answer.userSequence.join(',') === correctSequence.join(',');

      return {
        isCorrect,
        score: isCorrect ? 1 : 0,
        explanation: isCorrect ? 'Correct! Great job!' : 'Not quite right. Try again!',
      };
    }

    return {
      isCorrect: false,
      score: 0,
      explanation: 'Task not found',
    };
  }

  // Real API request
  const response = await fetch(`${API_URL}/tasks/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answer),
  });

  if (!response.ok) {
    throw new Error('Failed to check answer');
  }

  return response.json();
};
