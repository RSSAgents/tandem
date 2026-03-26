import { checkWidgetAnswer, getWidgetTasks, saveConsoleScore } from '@/api/widgetConsole.api';
import { IConsoleAnswer, IConsoleTask } from '@/types/widgetConsole.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDragAndDrop } from './useDragAndDrop';

export const useWidgetConsole = () => {
  const [tasks, setTasks] = useState<IConsoleTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [explanation, setExplanation] = useState('');

  const currentTask = tasks[currentIndex];

  const dragAndDropParams = useMemo(
    () => ({
      initialOptions: currentTask?.payload.options || [],
    }),
    [currentTask],
  );

  const { userOrder, sensors, handleDragEnd, resetUserOrder } = useDragAndDrop(dragAndDropParams);

  useEffect(() => {
    if (currentTask) {
      resetUserOrder(currentTask.payload.options);
    }
  }, [currentTask, resetUserOrder]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await getWidgetTasks({ signal: abortController.signal });
        setTasks(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
    return () => abortController.abort();
  }, []);

  const handleCheckResult = useCallback(async () => {
    if (!currentTask) return;

    try {
      const answer: IConsoleAnswer = {
        taskId: currentTask.id,
        userSequence: userOrder,
        timestamp: Date.now(),
      };

      const result = await checkWidgetAnswer(answer, currentTask);

      setIsCorrect(result.isCorrect);
      setExplanation(result.explanation || '');
      setShowResult(true);

      if (result.isCorrect) {
        setScore((prevScore) => prevScore + 10);
      }
    } catch {
      setError('Failed to check answer. Please try again.');
    }
  }, [currentTask, userOrder]);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
      setIsCorrect(false);
      setExplanation('');
    }
  }, [currentIndex, tasks.length]);

  const resetWidget = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setIsCorrect(false);
    setExplanation('');

    if (tasks.length > 0 && tasks[0]) {
      resetUserOrder(tasks[0].payload.options);
    }
  }, [tasks, resetUserOrder]);

  const saveResult = useCallback(async () => {
    try {
      await saveConsoleScore(score);
    } catch {
      setError('Failed to save score');
    }
  }, [score]);

  return {
    tasks,
    loading,
    error,
    currentIndex,
    showResult,
    isCorrect,
    score,
    explanation,
    currentTask,
    userOrder,

    handleCheckResult,
    handleNextQuestion,
    resetWidget,
    saveResult,

    sensors,
    handleDragEnd,
  };
};
