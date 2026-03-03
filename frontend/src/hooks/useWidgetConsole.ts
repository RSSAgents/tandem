import { useCallback, useEffect, useMemo, useState } from 'react';
import { IConsoleTasks } from '@/types/widgetConsole.types';
import { useDragAndDrop } from './useDragAndDrop';
import { getWidgetTasks } from '@/api/widgetConsole.api';

export const useWidgetConsole = () => {
  const [tasks, setTasks] = useState<IConsoleTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentTask = tasks[currentIndex];

  const dragAndDropParams = useMemo(
    () => ({
      initialOptions: currentTask?.options || [],
    }),
    [currentTask],
  );

  const { userOrder, sensors, handleDragEnd, resetUserOrder } = useDragAndDrop(dragAndDropParams);

  useEffect(() => {
    if (currentTask) {
      resetUserOrder(currentTask.options);
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

  const handleCheckResult = useCallback((userAnswers: string[], correctAnswers: string[]) => {
    const isCorrect =
      userAnswers.length === correctAnswers.length &&
      userAnswers.every((val, index) => val === correctAnswers[index]);

    setIsCorrect(isCorrect);
    setShowResult(true);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    return isCorrect;
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
      setIsCorrect(false);
    }
  }, [currentIndex, tasks.length]);

  return {
    tasks,
    loading,
    error,
    currentIndex,
    showResult,
    isCorrect,
    score,
    currentTask,
    userOrder,

    handleCheckResult,
    handleNextQuestion,

    sensors,
    handleDragEnd,
  };
};
