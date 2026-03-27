import type { Message } from '@/types/aiAgentTypes';
import {
  clearThreadHistory,
  loadAllScores,
  loadThreadHistory,
  saveAiAgentWidgetScore,
  saveThreadHistory,
  saveTopicScore,
} from '@api/aiAgent.api';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockGetUser, mockFrom } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock('@utils/supabase', () => ({
  supabase: {
    auth: { getUser: mockGetUser },
    from: mockFrom,
  },
}));

const createChain = (data: unknown = null, error: unknown = null) => ({
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  upsert: vi.fn().mockResolvedValue({ error }),
  delete: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockResolvedValue({ data }),
  then: (resolve: (v: { data: unknown; error: unknown }) => void, reject: (e: unknown) => void) =>
    Promise.resolve({ data, error }).then(resolve, reject),
});

describe('aiAgent.api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } });
  });

  describe('loadAllScores', () => {
    it('returns a topic→score map on success', async () => {
      const rows = [
        { topic: 'JavaScript Essentials', score: 8 },
        { topic: 'TypeScript', score: 5 },
      ];
      mockFrom.mockReturnValue(createChain(rows));

      const result = await loadAllScores();

      expect(result).toEqual({ 'JavaScript Essentials': 8, TypeScript: 5 });
    });

    it('returns empty object when no rows', async () => {
      mockFrom.mockReturnValue(createChain([]));

      const result = await loadAllScores();

      expect(result).toEqual({});
    });

    it('returns empty object when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      const result = await loadAllScores();

      expect(result).toEqual({});
      expect(mockFrom).not.toHaveBeenCalled();
    });

    it('throws when supabase returns an error', async () => {
      mockFrom.mockReturnValue(createChain(null, { message: 'DB error' }));

      await expect(loadAllScores()).rejects.toThrow('DB error');
    });
  });

  describe('saveTopicScore', () => {
    it('calls upsert with correct fields', async () => {
      const chain = createChain();
      mockFrom.mockReturnValue(chain);

      await saveTopicScore('TypeScript', 7);

      expect(mockFrom).toHaveBeenCalledWith('ai_topic_scores');
      expect(chain.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ user_id: 'user-1', topic: 'TypeScript', score: 7 }),
        { onConflict: 'user_id,topic' },
      );
    });

    it('does nothing when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      await saveTopicScore('TypeScript', 7);

      expect(mockFrom).not.toHaveBeenCalled();
    });

    it('throws when supabase returns an error', async () => {
      const chain = createChain(null, { message: 'upsert failed' });
      mockFrom.mockReturnValue(chain);

      await expect(saveTopicScore('TypeScript', 7)).rejects.toThrow('upsert failed');
    });
  });

  describe('saveAiAgentWidgetScore', () => {
    it('calls upsert with widget_type=ai-agent', async () => {
      const chain = createChain();
      mockFrom.mockReturnValue(chain);

      await saveAiAgentWidgetScore(50, 150);

      expect(mockFrom).toHaveBeenCalledWith('widget_scores');
      expect(chain.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: 'user-1',
          widget_type: 'ai-agent',
          score: 50,
          max_score: 150,
        }),
        { onConflict: 'user_id,widget_type' },
      );
    });

    it('does nothing when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      await saveAiAgentWidgetScore(50, 150);

      expect(mockFrom).not.toHaveBeenCalled();
    });

    it('throws when supabase returns an error', async () => {
      const chain = createChain(null, { message: 'widget error' });
      mockFrom.mockReturnValue(chain);

      await expect(saveAiAgentWidgetScore(50, 150)).rejects.toThrow('widget error');
    });
  });

  describe('loadThreadHistory', () => {
    it('returns parsed messages on success', async () => {
      const messages = [
        { id: '1', sender: 'ai', text: 'Hello', timestamp: 1000 },
        { id: '2', sender: 'user', text: 'Hi', timestamp: 2000 },
      ];
      const chain = createChain({ messages });
      mockFrom.mockReturnValue(chain);

      const result = await loadThreadHistory('TypeScript', 'interviewer');

      expect(result).toEqual(messages);
      expect(chain.maybeSingle).toHaveBeenCalled();
    });

    it('returns empty array when no record found', async () => {
      const chain = createChain(null);
      mockFrom.mockReturnValue(chain);

      const result = await loadThreadHistory('TypeScript', 'interviewer');

      expect(result).toEqual([]);
    });

    it('returns empty array when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      const result = await loadThreadHistory('TypeScript', 'interviewer');

      expect(result).toEqual([]);
      expect(mockFrom).not.toHaveBeenCalled();
    });
  });

  describe('saveThreadHistory', () => {
    it('calls upsert with correct fields', async () => {
      const messages: Message[] = [{ id: '1', sender: 'user', text: 'Hey', timestamp: 1000 }];
      const chain = createChain();
      mockFrom.mockReturnValue(chain);

      await saveThreadHistory('TypeScript', 'teacher', messages);

      expect(mockFrom).toHaveBeenCalledWith('ai_message_history');
      expect(chain.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: 'user-1',
          topic: 'TypeScript',
          thread_type: 'teacher',
          messages,
        }),
        { onConflict: 'user_id,topic,thread_type' },
      );
    });

    it('does nothing when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      await saveThreadHistory('TypeScript', 'teacher', []);

      expect(mockFrom).not.toHaveBeenCalled();
    });

    it('throws when supabase returns an error', async () => {
      const chain = createChain(null, { message: 'save failed' });
      mockFrom.mockReturnValue(chain);

      await expect(saveThreadHistory('TypeScript', 'teacher', [])).rejects.toThrow('save failed');
    });
  });

  describe('clearThreadHistory', () => {
    it('calls delete with correct filters', async () => {
      const chain = createChain(null, null);
      mockFrom.mockReturnValue(chain);

      await clearThreadHistory('TypeScript', 'interviewer');

      expect(mockFrom).toHaveBeenCalledWith('ai_message_history');
      expect(chain.delete).toHaveBeenCalled();
      expect(chain.eq).toHaveBeenCalledWith('user_id', 'user-1');
      expect(chain.eq).toHaveBeenCalledWith('topic', 'TypeScript');
      expect(chain.eq).toHaveBeenCalledWith('thread_type', 'interviewer');
    });

    it('does nothing when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      await clearThreadHistory('TypeScript', 'interviewer');

      expect(mockFrom).not.toHaveBeenCalled();
    });

    it('throws when supabase returns an error', async () => {
      mockFrom.mockReturnValue(createChain(null, { message: 'delete failed' }));

      await expect(clearThreadHistory('TypeScript', 'interviewer')).rejects.toThrow(
        'delete failed',
      );
    });
  });
});
