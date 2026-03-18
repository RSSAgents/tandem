import { useEffect, useRef, useState } from 'react';
import {
  AiLevelType,
  InputsState,
  InterviewerMode,
  Message,
  RoleType,
  StressModeType,
  Thread,
  ThreadType,
} from '../types/aiAgentTypes';
import { TOPICS } from '../utils/aiAgentConstants';

export const useAiAgentState = () => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [inputs, setInputs] = useState<InputsState>({});
  const [role, setRole] = useState<RoleType>('strict');
  const [stressMode, setStressMode] = useState<StressModeType>('normal');
  const [mobileActiveView, setMobileActiveView] = useState<'interviewer' | 'teacher'>(
    'interviewer',
  );
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [interviewerMode, setInterviewerMode] = useState<InterviewerMode>('interviewer');
  const [aiInterviewLevel, setAiInterviewLevel] = useState<AiLevelType>('junior');
  const timerRef = useRef<number | null>(null);

  const [resetInterviewerModalOpen, setResetInterviewerModalOpen] = useState(false);
  const [resetTeacherModalOpen, setResetTeacherModalOpen] = useState(false);

  const openResetInterviewer = () => setResetInterviewerModalOpen(true);
  const closeResetInterviewer = () => setResetInterviewerModalOpen(false);
  const openResetTeacher = () => setResetTeacherModalOpen(true);
  const closeResetTeacher = () => setResetTeacherModalOpen(false);

  const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
  const readinessPercentage = Math.ceil((totalScore / (TOPICS.length * 10)) * 100);

  useEffect(() => {
    if (stressMode !== 'normal') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimer(null);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [stressMode]);

  useEffect(() => {
    if (timer !== null && timer > 0) {
      timerRef.current = window.setInterval(() => {
        setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timer]);

  const getInput = (type: ThreadType) => (activeTopic ? (inputs[activeTopic]?.[type] ?? '') : '');
  const setInput = (type: ThreadType, val: string) => {
    if (!activeTopic) return;
    setInputs((prev) => ({ ...prev, [activeTopic]: { ...prev[activeTopic], [type]: val } }));
  };

  const clearHistory = (type: ThreadType) => {
    if (!activeTopic) return;
    setThreads((prev) => prev.filter((t) => !(t.topic === activeTopic && t.type === type)));
    setTimer(null);
    if (type === 'interviewer' || type === 'ai-interview') {
      setIsWaitingForAnswer(false);
      closeResetInterviewer();
    } else {
      closeResetTeacher();
    }
  };

  const currentModeThread = threads.find(
    (t) => t.topic === activeTopic && t.type === interviewerMode,
  );

  const questionCount = currentModeThread
    ? currentModeThread.messages.filter(
        (message) =>
          message.sender === 'ai' &&
          message.text.includes('?') &&
          !message.text.includes('Are you ready'),
      ).length
    : 0;

  const lastMessageInInterviewer = threads
    .find((t) => t.topic === activeTopic && t.type === 'interviewer')
    ?.messages.slice(-1)[0];
  const isInterviewerWaitingForUser = lastMessageInInterviewer?.sender === 'ai';

  const addMessage = (threadId: string, message: Message) => {
    setThreads((current) =>
      current.map((thread) =>
        thread.id === threadId ? { ...thread, messages: [...thread.messages, message] } : thread,
      ),
    );
  };

  const addMessages = (threadId: string, messages: Message[]) => {
    setThreads((current) =>
      current.map((thread) =>
        thread.id === threadId
          ? { ...thread, messages: [...thread.messages, ...messages] }
          : thread,
      ),
    );
  };

  const createOrUpdateThread = (thread: Thread) => {
    setThreads((prevThreads) => {
      const existingIndex = prevThreads.findIndex(
        (t) => t.topic === thread.topic && t.type === thread.type,
      );
      if (existingIndex >= 0) {
        const updated = [...prevThreads];
        updated[existingIndex] = thread;
        return updated;
      }
      return [...prevThreads, thread];
    });
  };

  const addScore = (topic: string, score: number) => {
    setScores((prev) => ({ ...prev, [topic]: score }));
  };

  return {
    activeTopic,
    setActiveTopic,
    threads,
    setThreads,
    inputs,
    setInputs,
    role,
    setRole,
    stressMode,
    setStressMode,
    mobileActiveView,
    setMobileActiveView,
    scores,
    setScores,
    isWaitingForAnswer,
    setIsWaitingForAnswer,
    timer,
    setTimer,
    interviewerMode,
    setInterviewerMode,
    aiInterviewLevel,
    setAiInterviewLevel,
    timerRef,
    resetInterviewerModalOpen,
    resetTeacherModalOpen,
    openResetInterviewer,
    closeResetInterviewer,
    openResetTeacher,
    closeResetTeacher,
    totalScore,
    readinessPercentage,
    getInput,
    setInput,
    clearHistory,
    currentModeThread,
    questionCount,
    isInterviewerWaitingForUser,
    lastMessageInInterviewer,
    addMessage,
    addMessages,
    createOrUpdateThread,
    addScore,
  };
};
