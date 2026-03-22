import { IConsoleAnswer, IConsoleTask } from '@/types/widgetConsole.types';
import { delay } from '@/utils/delay';
import { supabase } from '../utils/supabase';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

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

export const getWidgetTasks = async (options?: RequestInit): Promise<IConsoleTask[]> => {
  if (USE_MOCK) {
    await delay(500);

    if (options?.signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    return MOCK_TASKS;
  }

  const { data, error } = await supabase
    .from('questions_public')
    .select('*')
    .eq('type', 'console')
    .order('id')

  if (error) throw new Error(error.message);
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
        score: isCorrect ? 10 : 0,
        explanation: isCorrect ? 'Correct! Great job!' : 'Not quite right. Try again!',
      };
    }

    return {
      isCorrect: false,
      score: 0,
      explanation: 'Task not found',
    };
  }

  const { data, error } = await supabase
    .rpc('check_console_answer', {
      question_id: answer.taskId,
      user_answer: answer.userSequence,
    })

  if (error) throw new Error(error.message);

  return {
    isCorrect: data as boolean,
    score: data ? 10 : 0,
  };
};

export const saveConsoleScore = async (score: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('widget_scores')
    .upsert({
      user_id: user.id,
      widget_type: 'console',
      score,
      max_score: 100,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,widget_type'
    });

  if (error) throw new Error(error.message);
};
