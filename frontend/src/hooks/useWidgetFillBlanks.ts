import {
  checkFillBlanksAnswer,
  getFillBlanksTasks,
  saveFillBlanksScore,
} from '@/api/widgetFillBlanks.api';
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
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({});
  const [resultMap, setResultMap] = useState<Record<string, boolean>>({});

  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const currentTask = tasks[currentIndex];
  const isLastQuestion = currentIndex === tasks.length - 1;
  const isAllAnswered =
    currentTask?.payload.statements.every((s) => answers[currentTask.id]?.[s.id] !== undefined) ??
    false;

  const totalStatements = tasks.reduce(
    (acc, t) => acc + t.payload.statements.length,
    0
  );

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);

        const data = await getFillBlanksTasks(controller.signal);

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

  const handleChange = (id: string, value: string | null) => {
    if (!value || !currentTask) return;

    setAnswers((prev) => ({
      ...prev,
      [currentTask.id]: {
        ...prev[currentTask.id],
        [id]: Number(value),
      },
    }));
  };

  const handleCheckResult = useCallback(async () => {
    if (!currentTask) return;

    const results: Record<string, boolean> = {};
    let correctCount = 0;

    for (const s of currentTask.payload.statements) {
      const answerIndex = answers[currentTask.id]?.[s.id];
      if (answerIndex === undefined) continue;

      const isCorrect = await checkFillBlanksAnswer(currentTask.id, s.id, answerIndex);
      const key = `${currentTask.id}_${s.id}`;
      results[key] = isCorrect;

      if (isCorrect) {
        correctCount++;
      }
    }

    setShowResult(true);
    setIsCorrect(correctCount === currentTask.payload.statements.length);

    setResultMap((prev) => {
      const updated = { ...prev, ...results };
      return updated;
    });
  }, [answers, currentTask, totalStatements]);

  const handleNextQuestion = async () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      try {
      const correctCountAll = Object.values(resultMap).filter(Boolean).length;
      setCorrectAnswersCount(correctCountAll);

      const finalScore = Math.round((correctCountAll / totalStatements) * 80);
      setScore(finalScore);

        await saveFillBlanksScore(score);
      } catch {
        setError('Failed to save score');
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
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
    resultMap,

    showResult,
    isCorrect,
    isAllAnswered,
    score,
    isLastQuestion,
    handleCheckResult,
    handleNextQuestion,
    handlePreviousQuestion,

    totalStatements,
    correctAnswersCount,
  };
};
