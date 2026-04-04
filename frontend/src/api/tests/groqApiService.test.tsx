import { callGroqAPI, callGroqAPIStream } from '@api/groqApiService';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const makeOkJsonResponse = (content: string) => ({
  ok: true,
  json: vi.fn().mockResolvedValue({
    choices: [{ message: { content } }],
  }),
  body: null,
});

const makeErrorResponse = (message: string) => ({
  ok: false,
  json: vi.fn().mockResolvedValue({ error: { message } }),
  body: null,
});

function makeSseStreamResponse(deltas: string[]) {
  const encoder = new TextEncoder();
  const lines = deltas
    .map((d) => `data: ${JSON.stringify({ choices: [{ delta: { content: d } }] })}\n\n`)
    .join('');
  const bytes = encoder.encode(`${lines}data: [DONE]\n\n`);
  let offset = 0;

  return {
    ok: true,
    json: vi.fn(),
    body: {
      getReader: () => ({
        read: vi.fn().mockImplementation(async () => {
          if (offset < bytes.length) {
            const chunk = bytes.slice(offset, offset + 256);
            offset += 256;
            return { done: false, value: chunk };
          }
          return { done: true, value: undefined };
        }),
      }),
    },
  };
}

describe('groqApiService', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('callGroqAPI', () => {
    it('returns content from a successful response', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(makeOkJsonResponse('Hello from AI'));

      const result = await callGroqAPI([{ role: 'user', content: 'hi' }]);

      expect(result).toBe('Hello from AI');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('returns fallback text when choices are missing', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ choices: [] }),
        body: null,
      });

      const result = await callGroqAPI([{ role: 'user', content: 'hi' }]);

      expect(result).toBe('No response generated.');
    });

    it('throws when the API responds with an error status', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(makeErrorResponse('Rate limit exceeded'));

      await expect(callGroqAPI([{ role: 'user', content: 'hi' }])).rejects.toThrow();
    });

    it('throws when fetch itself rejects', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

      await expect(callGroqAPI([{ role: 'user', content: 'hi' }])).rejects.toThrow();
    });
  });

  describe('callGroqAPIStream', () => {
    it('accumulates streamed chunks and calls onChunk with accumulated text', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(makeSseStreamResponse(['He', 'llo', '!']));

      const onChunk = vi.fn();
      const result = await callGroqAPIStream([{ role: 'user', content: 'hi' }], onChunk);

      expect(result).toBe('Hello!');
      expect(onChunk).toHaveBeenCalled();
      expect(onChunk.mock.calls.at(-1)?.[0]).toBe('Hello!');
    });

    it('returns fallback when response body is null', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, body: null, json: vi.fn() });

      const result = await callGroqAPIStream([{ role: 'user', content: 'hi' }], vi.fn());

      expect(result).toBe('No response stream available.');
    });

    it('throws when the API responds with an error status', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(makeErrorResponse('Quota exceeded'));

      await expect(callGroqAPIStream([{ role: 'user', content: 'hi' }], vi.fn())).rejects.toThrow();
    });

    it('handles SSE lines with no delta without crashing', async () => {
      const encoder = new TextEncoder();
      const lines = `data: ${JSON.stringify({ choices: [{ delta: {} }] })}\n\ndata: [DONE]\n\n`;
      const bytes = encoder.encode(lines);
      let offset = 0;

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn().mockImplementation(async () => {
              if (offset < bytes.length) {
                const chunk = bytes.slice(offset, offset + 256);
                offset += 256;
                return { done: false, value: chunk };
              }
              return { done: true, value: undefined };
            }),
          }),
        },
      });

      const onChunk = vi.fn();
      const result = await callGroqAPIStream([{ role: 'user', content: 'hi' }], onChunk);

      expect(result).toBe('No response generated.');
      expect(onChunk).not.toHaveBeenCalled();
    });
  });
});
