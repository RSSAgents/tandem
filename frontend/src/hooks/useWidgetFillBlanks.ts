import { getFillBlanksTasks } from '@/components/features/widgets/FillBlanks/fillBlanks.api';
import { setCodeEditor } from '@/components/shared/CodeEditor/slice/editorSlice';
import { IFillBlanksTask } from '@/types/fillBlanks.types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useWidgetFillBlanks = () => {
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState<IFillBlanksTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentTask = tasks[currentIndex];
  const isAllAnswered = Object.values(answers).every(Boolean);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);

        const data = await getFillBlanksTasks({
          signal: controller.signal,
        });

        setTasks(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (currentTask) {
      const timeoutId = window.setTimeout(() => {
        dispatch(setCodeEditor(currentTask.payload.code));
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, [currentTask, dispatch]);

  useEffect(() => {
    if (currentTask) {
      const initial: Record<string, string> = {};
      currentTask.payload.statements.forEach((s) => {
        initial[s.id] = '';
      });
      setAnswers(initial);
    }
  }, [currentTask]);

  const handleChange = (id: string, value: string | null) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value || '',
    }));
  };

  const handleCheckResult = useCallback(() => {
    if (!currentTask) return;

    const correct = currentTask.payload.statements.every((s) => answers[s.id] === s.correctAnswer);

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  }, [answers, currentTask]);

  const handleNextQuestion = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    currentTask,
    currentIndex,
    answers,
    handleChange,

    showResult,
    isCorrect,
    isAllAnswered,
    score,
    handleCheckResult,
    handleNextQuestion,
  };
};
