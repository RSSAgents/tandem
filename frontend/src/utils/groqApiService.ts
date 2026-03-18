import { MODELS } from './aiAgentConstants';

export const callGroqAPI = async (messages: { role: string; content: string }[]) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) return 'API Key is missing.';

  for (const model of MODELS) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error(`Model ${model} failed:`, data.error?.message);
        const errorMsg = data.error?.message?.toLowerCase() || '';
        if (
          errorMsg.includes('rate') ||
          errorMsg.includes('limit') ||
          errorMsg.includes('capacity') ||
          errorMsg.includes('overloaded')
        ) {
          continue;
        }
        return `Error: ${data.error?.message || 'Unknown API error'}`;
      }
      return data?.choices?.[0]?.message?.content ?? 'No response generated.';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Model ${model} connection error`, error);
      continue;
    }
  }
  return 'All AI models are overloaded. Please try again later.';
};

export const callGroqAPIStream = async (
  messages: { role: string; content: string }[],
  onChunk: (chunk: string) => void,
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) return 'API Key is missing.';

  for (const model of MODELS) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          stream: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        // eslint-disable-next-line no-console
        console.error(`Model ${model} failed:`, data.error?.message);
        const errorMsg = data.error?.message?.toLowerCase() || '';
        if (
          errorMsg.includes('rate') ||
          errorMsg.includes('limit') ||
          errorMsg.includes('capacity') ||
          errorMsg.includes('overloaded')
        ) {
          continue;
        }
        return `Error: ${data.error?.message || 'Unknown API error'}`;
      }

      const reader = response.body?.getReader();
      if (!reader) return 'No response stream available.';

      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const payload = trimmed.slice(6);
          if (payload === '[DONE]') break;

          try {
            const parsed = JSON.parse(payload);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullText += delta;
              onChunk(fullText);
            }
          } catch {
            // skip malformed JSON chunks
          }
        }
      }

      return fullText || 'No response generated.';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Model ${model} connection error`, error);
      continue;
    }
  }
  return 'All AI models are overloaded. Please try again later.';
};
