import {
  ANIMATION_DELAY,
  ITEMS_COUNT,
  PAUSE_DELAY,
} from '@/components/features/widgets/Stack/Stack.constants';
import { useState } from 'react';

export type QuizState =
  | 'lifo-question'
  | 'fifo-question'
  | 'lifo-animation'
  | 'fifo-animation'
  | 'completed';

export const useStackAnimation = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>('lifo-question');

  const runLifoDemo = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStack([]);

    let count = 0;
    const addTimer = setInterval(() => {
      count++;
      setStack((prev) => [...prev, count]);

      if (count === ITEMS_COUNT) {
        clearInterval(addTimer);

        setTimeout(() => {
          const removeTimer = setInterval(() => {
            setStack((prev) => {
              if (prev.length === 0) {
                clearInterval(removeTimer);
                setIsAnimating(false);
                setQuizState('fifo-question');
                return prev;
              }
              return prev.slice(0, -1);
            });
          }, ANIMATION_DELAY);
        }, PAUSE_DELAY);
      }
    }, ANIMATION_DELAY);
  };

  const runFifoDemo = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setQueue([]);

    let count = 0;
    const addTimer = setInterval(() => {
      count++;
      setQueue((prev) => [...prev, count]);

      if (count === ITEMS_COUNT) {
        clearInterval(addTimer);

        setTimeout(() => {
          const removeTimer = setInterval(() => {
            setQueue((prev) => {
              if (prev.length === 0) {
                clearInterval(removeTimer);
                setIsAnimating(false);
                setQuizState('completed');
                return prev;
              }
              return prev.slice(1);
            });
          }, ANIMATION_DELAY);
        }, PAUSE_DELAY);
      }
    }, ANIMATION_DELAY);
  };

  return {
    stack,
    queue,
    isAnimating,
    quizState,
    setQuizState,
    runLifoDemo,
    runFifoDemo,
  };
};
