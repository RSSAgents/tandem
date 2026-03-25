import type { Thread } from '@/types/aiAgentTypes';
import { useAiAgentState } from '@hooks/useAiAgentState';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@api/aiAgent.api', () => ({
  loadAllScores: vi.fn().mockResolvedValue({}),
  saveTopicScore: vi.fn().mockResolvedValue(undefined),
  saveAiAgentWidgetScore: vi.fn().mockResolvedValue(undefined),
  clearThreadHistory: vi.fn().mockResolvedValue(undefined),
}));

import * as aiAgentApi from '@api/aiAgent.api';

describe('useAiAgentState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(aiAgentApi.loadAllScores).mockResolvedValue({});
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('has correct initial values', () => {
    const { result } = renderHook(() => useAiAgentState());

    expect(result.current.activeTopic).toBeNull();
    expect(result.current.threads).toEqual([]);
    expect(result.current.inputs).toEqual({});
    expect(result.current.role).toBe('gentle');
    expect(result.current.stressMode).toBe('normal');
    expect(result.current.scores).toEqual({});
    expect(result.current.isWaitingForAnswer).toBe(false);
    expect(result.current.timer).toBeNull();
    expect(result.current.interviewerMode).toBe('interviewer');
    expect(result.current.aiInterviewLevel).toBe('junior');
    expect(result.current.totalScore).toBe(0);
    expect(result.current.readinessPercentage).toBe(0);
    expect(result.current.resetInterviewerModalOpen).toBe(false);
    expect(result.current.resetTeacherModalOpen).toBe(false);
    expect(result.current.isWaitingForRestartConfirm).toBe(false);
  });

  it('calls loadAllScores on mount', async () => {
    vi.mocked(aiAgentApi.loadAllScores).mockResolvedValue({ TypeScript: 7 });
    const { result } = renderHook(() => useAiAgentState());

    await act(async () => {
      await vi.runAllTicks();
    });

    expect(aiAgentApi.loadAllScores).toHaveBeenCalledTimes(1);
    expect(result.current.scores).toEqual({ TypeScript: 7 });
  });

  it('setActiveTopic updates topic and clears isWaitingForRestartConfirm', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setIsWaitingForRestartConfirm(true);
      result.current.setActiveTopic('TypeScript');
    });

    expect(result.current.activeTopic).toBe('TypeScript');
    expect(result.current.isWaitingForRestartConfirm).toBe(false);
  });

  it('setStressMode("normal") clears the timer', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setTimer(30);
    });
    act(() => {
      result.current.setStressMode('normal');
    });

    expect(result.current.stressMode).toBe('normal');
    expect(result.current.timer).toBeNull();
  });

  it('setStressMode("stress") sets stress mode without touching the timer', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setStressMode('stress');
    });

    expect(result.current.stressMode).toBe('stress');
  });

  it('timer counts down every second', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setTimer(3);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timer).toBe(2);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timer).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timer).toBe(0);
  });

  it('timer stops at 0 and does not go negative', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setTimer(1);
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.timer).toBe(0);
  });

  it('getInput returns empty string before topic is set', () => {
    const { result } = renderHook(() => useAiAgentState());

    expect(result.current.getInput('interviewer')).toBe('');
  });

  it('setInput and getInput work per topic and thread type', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setActiveTopic('TypeScript');
    });
    act(() => {
      result.current.setInput('teacher', 'hello teacher');
    });

    expect(result.current.getInput('teacher')).toBe('hello teacher');
    expect(result.current.getInput('interviewer')).toBe('');
  });

  it('setInput does nothing when activeTopic is null', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setInput('teacher', 'ignored');
    });

    expect(result.current.inputs).toEqual({});
  });

  it('addMessage appends a message to the correct thread', () => {
    const { result } = renderHook(() => useAiAgentState());
    const thread: Thread = { id: 't1', topic: 'TS', type: 'teacher', messages: [] };

    act(() => {
      result.current.createOrUpdateThread(thread);
    });
    act(() => {
      result.current.addMessage('t1', {
        id: 'm1',
        sender: 'user',
        text: 'Hi',
        timestamp: 1000,
      });
    });

    expect(result.current.threads[0].messages).toHaveLength(1);
    expect(result.current.threads[0].messages[0].text).toBe('Hi');
  });

  it('addMessages appends multiple messages', () => {
    const { result } = renderHook(() => useAiAgentState());
    const thread: Thread = { id: 't2', topic: 'TS', type: 'teacher', messages: [] };

    act(() => {
      result.current.createOrUpdateThread(thread);
    });
    act(() => {
      result.current.addMessages('t2', [
        { id: 'm1', sender: 'user', text: 'Hello', timestamp: 1 },
        { id: 'm2', sender: 'ai', text: 'World', timestamp: 2 },
      ]);
    });

    expect(result.current.threads[0].messages).toHaveLength(2);
  });

  it('createOrUpdateThread adds a new thread', () => {
    const { result } = renderHook(() => useAiAgentState());
    const thread: Thread = { id: 'new', topic: 'TS', type: 'teacher', messages: [] };

    act(() => {
      result.current.createOrUpdateThread(thread);
    });

    expect(result.current.threads).toHaveLength(1);
    expect(result.current.threads[0].id).toBe('new');
  });

  it('createOrUpdateThread replaces an existing thread with same topic+type', () => {
    const { result } = renderHook(() => useAiAgentState());
    const thread1: Thread = { id: 'old', topic: 'TS', type: 'teacher', messages: [] };
    const thread2: Thread = {
      id: 'new',
      topic: 'TS',
      type: 'teacher',
      messages: [{ id: 'm1', sender: 'ai', text: 'updated', timestamp: 1 }],
    };

    act(() => {
      result.current.createOrUpdateThread(thread1);
    });
    act(() => {
      result.current.createOrUpdateThread(thread2);
    });

    expect(result.current.threads).toHaveLength(1);
    expect(result.current.threads[0].messages[0].text).toBe('updated');
  });

  it('clearHistory removes thread and calls clearThreadHistory API', async () => {
    const { result } = renderHook(() => useAiAgentState());
    const thread: Thread = {
      id: 'tid',
      topic: 'TypeScript',
      type: 'interviewer',
      messages: [],
    };

    act(() => {
      result.current.setActiveTopic('TypeScript');
      result.current.createOrUpdateThread(thread);
    });
    act(() => {
      result.current.clearHistory('interviewer');
    });

    expect(result.current.threads).toHaveLength(0);
    await act(async () => {
      await vi.runAllTicks();
    });
    expect(aiAgentApi.clearThreadHistory).toHaveBeenCalledWith('TypeScript', 'interviewer');
  });

  it('clearHistory does nothing when activeTopic is null', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.clearHistory('teacher');
    });

    expect(aiAgentApi.clearThreadHistory).not.toHaveBeenCalled();
  });

  it('addScore updates local scores and calls both API functions', async () => {
    const { result } = renderHook(() => useAiAgentState());

    await act(async () => {
      await vi.runAllTicks();
    });

    act(() => {
      result.current.addScore('TypeScript', 8);
    });

    await act(async () => {
      await vi.runAllTicks();
    });

    expect(result.current.scores['TypeScript']).toBe(8);
    expect(aiAgentApi.saveTopicScore).toHaveBeenCalledWith('TypeScript', 8);
    expect(aiAgentApi.saveAiAgentWidgetScore).toHaveBeenCalled();
  });

  it('readinessPercentage calculates correctly', async () => {
    vi.mocked(aiAgentApi.loadAllScores).mockResolvedValue({ TypeScript: 10, 'Async JS': 5 });
    const { result } = renderHook(() => useAiAgentState());

    await act(async () => {
      await vi.runAllTicks();
    });

    expect(result.current.totalScore).toBe(15);
    expect(result.current.readinessPercentage).toBe(10);
  });

  it('questionCount counts AI messages with "?" after index 0', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setActiveTopic('TypeScript');
      result.current.createOrUpdateThread({
        id: 'q1',
        topic: 'TypeScript',
        type: 'interviewer',
        messages: [
          { id: 'm0', sender: 'ai', text: 'Welcome!', timestamp: 0 },
          { id: 'm1', sender: 'ai', text: 'What is TypeScript?', timestamp: 1 },
          { id: 'm2', sender: 'user', text: 'My answer', timestamp: 2 },
          { id: 'm3', sender: 'ai', text: 'Good. What else?', timestamp: 3 },
        ],
      });
    });

    expect(result.current.questionCount).toBe(2);
  });

  it('openResetInterviewer / closeResetInterviewer toggle modal', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => result.current.openResetInterviewer());
    expect(result.current.resetInterviewerModalOpen).toBe(true);

    act(() => result.current.closeResetInterviewer());
    expect(result.current.resetInterviewerModalOpen).toBe(false);
  });

  it('openResetTeacher / closeResetTeacher toggle modal', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => result.current.openResetTeacher());
    expect(result.current.resetTeacherModalOpen).toBe(true);

    act(() => result.current.closeResetTeacher());
    expect(result.current.resetTeacherModalOpen).toBe(false);
  });

  it('isInterviewerWaitingForUser is true when last interviewer message is from AI', () => {
    const { result } = renderHook(() => useAiAgentState());

    act(() => {
      result.current.setActiveTopic('TypeScript');
      result.current.createOrUpdateThread({
        id: 'iw',
        topic: 'TypeScript',
        type: 'interviewer',
        messages: [
          { id: 'm1', sender: 'user', text: 'Hello', timestamp: 1 },
          { id: 'm2', sender: 'ai', text: 'Tell me about TS?', timestamp: 2 },
        ],
      });
    });

    expect(result.current.isInterviewerWaitingForUser).toBe(true);
  });
});
