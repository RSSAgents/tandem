import type { MutableRefObject } from 'react';

export type ThreadType = 'interviewer' | 'teacher' | 'ai-interview';

export interface Message {
  id: string;
  sender: 'user' | 'ai' | 'candidate';
  text: string;
  timestamp: number;
  aiRole?: 'interviewer' | 'candidate';
  streaming?: boolean;
}

export interface Thread {
  id: string;
  topic: string;
  type: ThreadType;
  messages: Message[];
}

export type InputsState = Record<string, Partial<Record<ThreadType, string>>>;
export type InterviewerMode = 'interviewer' | 'ai-interview' | 'teacher';
export type RoleType = 'gentle' | 'strict';
export type StressModeType = 'normal' | 'stress';
export type AiLevelType = 'junior' | 'middle' | 'senior';
export type MobileViewType = 'interviewer' | 'teacher';
export type DrawerType = 'menu' | 'topics';

export interface AgentState {
  activeTopic: string | null;
  setActiveTopic: (topic: string | null) => void;
  threads: Thread[];
  setThreads: (threads: Thread[] | ((prev: Thread[]) => Thread[])) => void;
  inputs: InputsState;
  setInputs: (inputs: InputsState | ((prev: InputsState) => InputsState)) => void;
  role: RoleType;
  setRole: (role: RoleType) => void;
  stressMode: StressModeType;
  setStressMode: (mode: StressModeType) => void;
  mobileActiveView: MobileViewType;
  setMobileActiveView: (view: MobileViewType) => void;
  scores: Record<string, number>;
  setScores: (
    scores: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>),
  ) => void;
  isWaitingForAnswer: boolean;
  setIsWaitingForAnswer: (waiting: boolean) => void;
  waitingForType: ThreadType | null;
  setWaitingForType: (type: ThreadType | null) => void;
  timer: number | null;
  setTimer: (timer: number | null) => void;
  interviewerMode: InterviewerMode;
  setInterviewerMode: (mode: InterviewerMode) => void;
  aiInterviewLevel: AiLevelType;
  setAiInterviewLevel: (level: AiLevelType) => void;
  timerRef: MutableRefObject<number | null>;
  threadsRef: MutableRefObject<Thread[]>;
  isWaitingForRestartConfirm: boolean;
  setIsWaitingForRestartConfirm: (v: boolean) => void;
  resetInterviewerModalOpen: boolean;
  resetTeacherModalOpen: boolean;
  openResetInterviewer: () => void;
  closeResetInterviewer: () => void;
  openResetTeacher: () => void;
  closeResetTeacher: () => void;
  totalScore: number;
  readinessPercentage: number;
  getInput: (type: ThreadType) => string;
  setInput: (type: ThreadType, val: string) => void;
  clearHistory: (type: ThreadType) => void;
  currentModeThread: Thread | undefined;
  questionCount: number;
  isInterviewerWaitingForUser: boolean;
  lastMessageInInterviewer: Message | undefined;
  addMessage: (threadId: string, message: Message) => void;
  addMessages: (threadId: string, messages: Message[]) => void;
  createOrUpdateThread: (thread: Thread) => void;
  addScore: (topic: string, score: number) => void;
}
