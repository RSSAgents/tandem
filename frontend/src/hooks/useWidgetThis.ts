import { checkThisAnswer, getThisTasks, saveThisScore } from '@/api/widgetThis.api';
import { AppLanguage } from '@/i18n/config';
import { getLocalizedString } from '@/utils/localize';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IThisTask } from '../types/widgetThis.types';

export const useWidgetThis = () => {
  const [tasks, setTasks] = useState<IThisTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { i18n } = useTranslation();
  const lang = i18n.language as AppLanguage;
  const currentTask = tasks[currentIndex];

  useEffect(() => {
    const abortController = new AbortController();

    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await getThisTasks(abortController.signal);
        setTasks(data);
      } catch (err: unknown) {
        const isAbortError = err instanceof Error && err.name === 'AbortError';

        const isAbortedMessage =
          err instanceof Error && err.message.toLowerCase().includes('abort');
        if (isAbortError || isAbortedMessage || abortController.signal.aborted) {
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

  const handleAnswer = useCallback(
    async (answer: string) => {
      if (!currentTask) return;
      try {
        const result = await checkThisAnswer(currentTask.id, answer);
        setIsCorrect(result);
        if (result) {
          setScore((prev) => prev + 10);
        }
      } catch {
        setError('Failed to check answer');
      }
    },
    [currentTask],
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
    setIsCorrect(null);
  }, []);

  const saveResult = useCallback(async () => {
    try {
      await saveThisScore(score);
    } catch {
      setError('Failed to save score');
    }
  }, [score]);

  const explanation = currentTask?.payload.explanation
    ? getLocalizedString(currentTask.payload.explanation, lang)
    : '';

  return {
    tasks,
    loading,
    error,
    currentTask,
    currentIndex,
    score,
    isCorrect,
    explanation,
    handleAnswer,
    handleNext,
    saveResult,
  };
};
