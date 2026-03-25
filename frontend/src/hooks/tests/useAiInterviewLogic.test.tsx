import { AgentState, Thread } from '@/types/aiAgentTypes';
import { useAiInterviewLogic } from '@hooks/useAiInterviewLogic';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@api/aiAgent.api', () => ({
  saveThreadHistory: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@api/groqApiService', () => ({
  callGroqAPI: vi.fn(),
  callGroqAPIStream: vi.fn(),
}));

import * as aiAgentApi from '@api/aiAgent.api';
import * as groqApiService from '@api/groqApiService';

function makeThread(overrides: Partial<Thread> = {}): Thread {
  return {
    id: 'thread-1',
    topic: 'TypeScript',
    type: 'interviewer',
    messages: [],
    ...overrides,
  };
}

function makeMockState(overrides: Partial<AgentState> = {}): AgentState {
  const threads: Thread[] = [makeThread()];
  const threadsRef = { current: threads };
  const setThreadsMock = vi
    .fn()
    .mockImplementation((updater: Thread[] | ((prev: Thread[]) => Thread[])) => {
      if (typeof updater === 'function') {
        threadsRef.current = updater(threadsRef.current);
      } else {
        threadsRef.current = updater;
      }
    });
  return {
    activeTopic: 'TypeScript',
    setActiveTopic: vi.fn(),
    threads,
    setThreads: setThreadsMock,
    inputs: { TypeScript: { interviewer: '' } },
    setInputs: vi.fn(),
    role: 'gentle',
    setRole: vi.fn(),
    stressMode: 'normal',
    setStressMode: vi.fn(),
    mobileActiveView: 'interviewer',
    setMobileActiveView: vi.fn(),
    scores: {},
    setScores: vi.fn(),
    isWaitingForAnswer: false,
    setIsWaitingForAnswer: vi.fn(),
    waitingForType: null,
    setWaitingForType: vi.fn(),
    timer: null,
    setTimer: vi.fn(),
    interviewerMode: 'interviewer',
    setInterviewerMode: vi.fn(),
    aiInterviewLevel: 'junior',
    setAiInterviewLevel: vi.fn(),
    timerRef: { current: null },
    threadsRef,
    isWaitingForRestartConfirm: false,
    setIsWaitingForRestartConfirm: vi.fn(),
    resetInterviewerModalOpen: false,
    resetTeacherModalOpen: false,
    openResetInterviewer: vi.fn(),
    closeResetInterviewer: vi.fn(),
    openResetTeacher: vi.fn(),
    closeResetTeacher: vi.fn(),
    totalScore: 0,
    readinessPercentage: 0,
    getInput: vi.fn().mockReturnValue(''),
    setInput: vi.fn(),
    clearHistory: vi.fn(),
    currentModeThread: threads[0],
    questionCount: 0,
    isInterviewerWaitingForUser: false,
    lastMessageInInterviewer: undefined,
    addMessage: vi.fn(),
    addMessages: vi.fn(),
    createOrUpdateThread: vi.fn(),
    addScore: vi.fn(),
    ...overrides,
  };
}

describe('useAiInterviewLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getStartMessageForType', () => {
    it('returns interviewer gentle/normal key', () => {
      const state = makeMockState({ role: 'gentle', stressMode: 'normal' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('interviewer', null);

      expect(msg).toBe('startMessages.interviewer.gentleNormal');
    });

    it('returns interviewer strict/normal key', () => {
      const state = makeMockState({ role: 'strict', stressMode: 'normal' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('interviewer', null);

      expect(msg).toBe('startMessages.interviewer.strictNormal');
    });

    it('returns interviewer gentle/stress key', () => {
      const state = makeMockState({ role: 'gentle', stressMode: 'stress' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('interviewer', null);

      expect(msg).toBe('startMessages.interviewer.gentleStress');
    });

    it('returns interviewer strict/stress key', () => {
      const state = makeMockState({ role: 'strict', stressMode: 'stress' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('interviewer', null);

      expect(msg).toBe('startMessages.interviewer.strictStress');
    });

    it('appends readyPrompt when topic is given for interviewer', () => {
      const state = makeMockState({ role: 'gentle', stressMode: 'normal' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('interviewer', 'TypeScript');

      expect(msg).toContain('startMessages.interviewer.readyPrompt');
    });

    it('returns teacher stress unavailable key in stress mode', () => {
      const state = makeMockState({ stressMode: 'stress' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('teacher', null);

      expect(msg).toBe('teacher.stressUnavailable');
    });

    it('returns teacher strict key', () => {
      const state = makeMockState({ role: 'strict', stressMode: 'normal' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('teacher', null);

      expect(msg).toBe('startMessages.teacher.strict');
    });

    it('returns teacher gentle key', () => {
      const state = makeMockState({ role: 'gentle', stressMode: 'normal' });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('teacher', null);

      expect(msg).toBe('startMessages.teacher.gentle');
    });

    it('returns ai-interview gentle/normal key', () => {
      const state = makeMockState({
        role: 'gentle',
        stressMode: 'normal',
        aiInterviewLevel: 'middle',
      });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      const msg = result.current.getStartMessageForType('ai-interview', null);

      expect(msg).toBe('startMessages.aiInterview.gentleNormal');
    });
  });

  describe('handleSend – restart-confirm flow', () => {
    it('does nothing when activeTopic is null', async () => {
      const state = makeMockState({ activeTopic: null });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'yes');
      });

      expect(state.setIsWaitingForAnswer).not.toHaveBeenCalled();
    });

    it('responds to "yes" by clearing history and resetting confirm flag', async () => {
      const state = makeMockState({ isWaitingForRestartConfirm: true });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'yes');
      });

      expect(state.setIsWaitingForRestartConfirm).toHaveBeenCalledWith(false);
      expect(state.clearHistory).toHaveBeenCalledWith('interviewer');
    });

    it('responds to "да" (Russian yes) by clearing history', async () => {
      const state = makeMockState({ isWaitingForRestartConfirm: true });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'да');
      });

      expect(state.clearHistory).toHaveBeenCalledWith('interviewer');
    });

    it('responds to "no" by adding decline message and resetting confirm flag', async () => {
      const state = makeMockState({ isWaitingForRestartConfirm: true });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'no');
      });

      expect(state.setIsWaitingForRestartConfirm).toHaveBeenCalledWith(false);
      expect(state.addMessage).toHaveBeenCalledWith(
        makeThread().id,
        expect.objectContaining({ text: 'interviewer.newInterviewDecline', sender: 'ai' }),
      );
    });

    it('responds to unknown text with unknown message', async () => {
      const state = makeMockState({ isWaitingForRestartConfirm: true });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'maybe later');
      });

      expect(state.addMessage).toHaveBeenCalledWith(
        makeThread().id,
        expect.objectContaining({ text: 'interviewer.newInterviewUnknown', sender: 'ai' }),
      );
    });

    it('skips when forcedText is empty in restart-confirm mode', async () => {
      const state = makeMockState({
        isWaitingForRestartConfirm: true,
        inputs: { TypeScript: { interviewer: '' } },
      });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer');
      });

      expect(state.clearHistory).not.toHaveBeenCalled();
      expect(state.addMessage).not.toHaveBeenCalled();
    });
  });

  describe('handleSend – normal flow', () => {
    beforeEach(() => {
      vi.mocked(groqApiService.callGroqAPIStream).mockImplementation(async () => {
        return 'AI response text';
      });
    });

    it('does nothing when text is empty', async () => {
      const state = makeMockState({ inputs: { TypeScript: { interviewer: '' } } });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer');
      });

      expect(state.setIsWaitingForAnswer).not.toHaveBeenCalled();
    });

    it('uses forcedText when provided instead of input state', async () => {
      const state = makeMockState();
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'Forced message');
      });

      expect(state.setIsWaitingForAnswer).toHaveBeenCalledWith(true);
    });

    it('clears the timer on send for interviewer type', async () => {
      const state = makeMockState({ timer: 45, inputs: { TypeScript: { interviewer: 'msg' } } });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'some text');
      });

      expect(state.setTimer).toHaveBeenCalledWith(null);
    });

    it('calls callGroqAPIStream and sets isWaitingForAnswer false after', async () => {
      const state = makeMockState({ inputs: { TypeScript: { interviewer: 'my question' } } });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'my question');
      });

      expect(groqApiService.callGroqAPIStream).toHaveBeenCalled();
      expect(state.setIsWaitingForAnswer).toHaveBeenLastCalledWith(false);
    });

    it('calls addScore when response contains FINAL_SCORE', async () => {
      vi.mocked(groqApiService.callGroqAPIStream).mockImplementation(async () => {
        return 'Great job! FINAL_SCORE: 8';
      });

      const state = makeMockState({ inputs: { TypeScript: { interviewer: 'done' } } });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'done');
      });

      expect(state.addScore).toHaveBeenCalledWith('TypeScript', 8);
      expect(state.setIsWaitingForRestartConfirm).toHaveBeenCalledWith(true);
    });

    it('sets timer when in stress mode after AI reply without FINAL_SCORE', async () => {
      vi.mocked(groqApiService.callGroqAPIStream).mockImplementation(async () => 'Next question?');

      const state = makeMockState({
        stressMode: 'stress',
        inputs: { TypeScript: { interviewer: 'answer' } },
      });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.handleSend('interviewer', 'answer');
      });

      expect(state.setTimer).toHaveBeenCalledWith(expect.any(Number));
    });
  });

  describe('startAiInterviewSimulation', () => {
    it('does nothing when activeTopic is null', async () => {
      const state = makeMockState({ activeTopic: null });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.startAiInterviewSimulation();
      });

      expect(groqApiService.callGroqAPI).not.toHaveBeenCalled();
    });

    it('calls callGroqAPI and adds interviewer message', async () => {
      vi.mocked(groqApiService.callGroqAPI).mockResolvedValue(
        'Interviewer: What is TypeScript?\nCandidate: It is a typed superset.',
      );

      const state = makeMockState({ threads: [] });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.startAiInterviewSimulation();
      });

      expect(groqApiService.callGroqAPI).toHaveBeenCalled();
      expect(state.setThreads).toHaveBeenCalled();
    });

    it('saves thread history after generating exchange', async () => {
      vi.useFakeTimers();
      vi.mocked(groqApiService.callGroqAPI).mockResolvedValue(
        'Interviewer: Question?\nCandidate: Answer.',
      );

      const state = makeMockState({ threads: [] });
      const { result } = renderHook(() => useAiInterviewLogic(state));

      await act(async () => {
        await result.current.startAiInterviewSimulation();
      });

      await act(async () => {
        vi.runAllTimers();
      });

      expect(aiAgentApi.saveThreadHistory).toHaveBeenCalled();
      vi.useRealTimers();
    });
  });
});
