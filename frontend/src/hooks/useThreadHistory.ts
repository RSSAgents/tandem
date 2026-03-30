import { Thread, ThreadType } from '@/types/aiAgentTypes';
import { loadThreadHistory } from '@api/aiAgent.api';
import { useEffect, useState } from 'react';

export const useThreadHistory = (
  activeTopic: string | null,
  createOrUpdateThread: (thread: Thread) => void,
) => {
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    if (!activeTopic) return;
    const topic = activeTopic;

    const threadTypes: Array<{ dbType: string; type: ThreadType }> = [
      { dbType: 'interviewer', type: 'interviewer' },
      { dbType: 'teacher', type: 'teacher' },
      { dbType: 'ai-interview-junior', type: 'ai-interview' },
      { dbType: 'ai-interview-middle', type: 'ai-interview' },
      { dbType: 'ai-interview-senior', type: 'ai-interview' },
    ];

    Promise.resolve()
      .then(() => {
        setIsLoadingHistory(true);
        return Promise.all(
          threadTypes.map(async ({ dbType, type }) => {
            const messages = await loadThreadHistory(topic, dbType).catch(() => []);
            if (messages.length === 0) return;

            const thread: Thread = {
              id: crypto.randomUUID(),
              topic,
              type,
              messages,
            };
            createOrUpdateThread(thread);
          }),
        );
      })
      .finally(() => {
        setIsLoadingHistory(false);
      });
  }, [activeTopic, createOrUpdateThread]);

  return { isLoadingHistory };
};
