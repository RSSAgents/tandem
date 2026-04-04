import { AgentState, Message, Thread, ThreadType } from '@/types/aiAgentTypes';
import { saveThreadHistory } from '@api/aiAgent.api';
import { callGroqAPI, callGroqAPIStream } from '@api/groqApiService';
import {
  AI_INTERVIEW_DELAY_MS,
  CANDIDATE_DELAY_MS,
  MAX_QUESTIONS,
  MAX_SCORE,
  THREAD_TIMESTAMP_OFFSET_MS,
  TIMER_SECONDS,
  TYPING_CHARS_PER_FRAME,
} from '@constants/aiAgentConstants';
import { useTranslation } from 'react-i18next';

export const useAiInterviewLogic = (state: AgentState) => {
  const { t, i18n } = useTranslation('aiAgent');

  const getStartMessageForType = (type: ThreadType, topic: string | null) => {
    const params = {
      maxQuestions: MAX_QUESTIONS,
      maxScore: MAX_SCORE,
      timerSeconds: TIMER_SECONDS,
    };

    const getInterviewerStartMessage = () => {
      if (state.role === 'gentle' && state.stressMode === 'normal') {
        return t('startMessages.interviewer.gentleNormal', params);
      }
      if (state.role === 'strict' && state.stressMode === 'normal') {
        return t('startMessages.interviewer.strictNormal', params);
      }
      if (state.role === 'gentle' && state.stressMode === 'stress') {
        return t('startMessages.interviewer.gentleStress', params);
      }
      return t('startMessages.interviewer.strictStress', params);
    };

    const getTeacherStartMessage = () => {
      if (state.stressMode === 'stress') return t('teacher.stressUnavailable');
      if (state.role === 'strict') {
        return t('startMessages.teacher.strict');
      }
      return t('startMessages.teacher.gentle');
    };

    const getAiInterviewStartMessage = () => {
      const level = state.aiInterviewLevel.toUpperCase();
      if (state.role === 'gentle' && state.stressMode === 'normal')
        return t('startMessages.aiInterview.gentleNormal', { level });
      if (state.role === 'strict' && state.stressMode === 'normal')
        return t('startMessages.aiInterview.strictNormal', { level });
      if (state.role === 'gentle' && state.stressMode === 'stress')
        return t('startMessages.aiInterview.gentleStress', { level });
      return t('startMessages.aiInterview.strictStress', { level });
    };

    if (type === 'teacher') return getTeacherStartMessage();
    if (type === 'ai-interview') {
      let msg = getAiInterviewStartMessage();
      if (topic) msg += t('startMessages.aiInterview.topicSelected', { topic });
      return msg;
    }
    let msg = getInterviewerStartMessage();
    if (topic) msg += t('startMessages.interviewer.readyPrompt', { topic });
    return msg;
  };

  const simulateAiReply = async (
    threadId: string,
    userText: string,
    type: ThreadType,
    manualActiveTopic: string,
  ) => {
    const formatDisplayText = (text: string) =>
      text.replace(
        /FINAL_SCORE:\s*(\d+)/gi,
        (_, score) => `${t('interviewer.finalScoreLabel')}: ${score}`,
      );

    const currentThread = state.threads.find((t) => t.id === threadId) || { messages: [] };
    const refusalWord =
      state.role === 'strict' ? t('prompts.refusalStrict') : t('prompts.refusalGentle');

    let systemPrompt = '';

    if (type === 'interviewer') {
      systemPrompt = t('prompts.interviewer', {
        topic: manualActiveTopic,
        maxQuestions: MAX_QUESTIONS,
        maxScore: MAX_SCORE,
        refusalWord,
        tone: state.role.toUpperCase(),
      });
    } else if (type === 'teacher') {
      systemPrompt = t('prompts.teacher', {
        topic: manualActiveTopic,
        tone: state.role.toUpperCase(),
      });
    }

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...currentThread.messages.map((m) => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.text,
      })),
    ];

    apiMessages.push({ role: 'user', content: userText });

    const placeholderIds: string[] = [];
    const targetTexts: string[] = [];
    let streamDone = false;

    const typeMessage = (partIndex: number): Promise<void> => {
      return new Promise((resolve) => {
        let revealed = 0;
        const tick = () => {
          const target = targetTexts[partIndex] || '';
          const end = streamDone
            ? target.length
            : Math.min(revealed + TYPING_CHARS_PER_FRAME, target.length);
          revealed = end;
          const visibleText = target.slice(0, revealed);
          const stillTyping = !streamDone || revealed < target.length;

          state.setThreads((current: Thread[]) =>
            current.map((thread) => {
              if (thread.id !== threadId) return thread;
              const msgId = placeholderIds[partIndex];
              const exists = thread.messages.some((m) => m.id === msgId);
              if (exists) {
                return {
                  ...thread,
                  messages: thread.messages.map((m) =>
                    m.id === msgId ? { ...m, text: visibleText, streaming: stillTyping } : m,
                  ),
                };
              }
              return {
                ...thread,
                messages: [
                  ...thread.messages,
                  {
                    id: msgId,
                    sender: 'ai' as const,
                    text: visibleText,
                    timestamp: Date.now(),
                    streaming: stillTyping,
                  },
                ],
              };
            }),
          );

          if (revealed < target.length || (!streamDone && revealed >= target.length)) {
            requestAnimationFrame(tick);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(tick);
      });
    };

    let typingStarted = false;
    let typingPromise: Promise<void> | null = null;

    const aiResponseText = await callGroqAPIStream(apiMessages, (accumulated) => {
      const parts = accumulated.split('|||');
      for (let i = 0; i < parts.length; i++) {
        if (!placeholderIds[i]) {
          placeholderIds[i] = crypto.randomUUID();
        }
        targetTexts[i] = parts[i].trim();
      }
      if (!typingStarted) {
        typingStarted = true;
        typingPromise = typeMessage(0);
      }
    });

    streamDone = true;

    const finalParts = aiResponseText.split('|||');
    for (let i = 0; i < finalParts.length; i++) {
      if (!placeholderIds[i]) {
        placeholderIds[i] = crypto.randomUUID();
      }
      targetTexts[i] = formatDisplayText(finalParts[i].trim());
    }

    if (typingPromise) await typingPromise;

    for (let i = 1; i < finalParts.length; i++) {
      await typeMessage(i);
    }

    const hasFinalScore = type === 'interviewer' && aiResponseText.includes('FINAL_SCORE:');

    if (hasFinalScore) {
      const match = aiResponseText.match(/FINAL_SCORE:\s*(\d+)/);
      if (match) {
        state.addScore(manualActiveTopic, parseInt(match[1], 10));
      }
      state.setTimer(null);
      state.setIsWaitingForRestartConfirm(true);

      const promptMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: t('interviewer.newInterviewPrompt'),
        timestamp: Date.now(),
      };
      state.setThreads((current: Thread[]) =>
        current.map((thread) =>
          thread.id === threadId
            ? { ...thread, messages: [...thread.messages, promptMsg] }
            : thread,
        ),
      );

      setTimeout(() => {
        const savedThread = state.threadsRef.current.find((t) => t.id === threadId);
        if (savedThread) {
          saveThreadHistory(manualActiveTopic, type, savedThread.messages).catch(() => {});
        }
      }, 0);
    } else {
      if (type === 'interviewer' && state.stressMode === 'stress') {
        state.setTimer(TIMER_SECONDS);
      }
      setTimeout(() => {
        const savedThread = state.threadsRef.current.find((t) => t.id === threadId);
        if (savedThread) {
          saveThreadHistory(manualActiveTopic, type, savedThread.messages).catch(() => {});
        }
      }, 0);
    }

    state.setIsWaitingForAnswer(false);
    state.setWaitingForType(null);
  };

  const handleSend = async (type: ThreadType, forcedText?: string) => {
    if (!state.activeTopic) return;

    if (type === 'interviewer' && state.isWaitingForRestartConfirm) {
      const text = (forcedText || state.inputs[state.activeTopic]?.[type]?.trim()) ?? '';
      if (!text) return;

      if (!forcedText) {
        state.setInputs((prev: Record<string, Partial<Record<ThreadType, string>>>) => ({
          ...prev,
          [state.activeTopic!]: { ...prev[state.activeTopic!], [type]: '' },
        }));
      }

      const userMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'user',
        text,
        timestamp: Date.now(),
      };
      const existingThread = state.threads.find(
        (t: Thread) => t.topic === state.activeTopic && t.type === 'interviewer',
      );
      if (existingThread) {
        state.addMessage(existingThread.id, userMsg);
      }

      const trimmed = text.trim().toLowerCase();
      const isYes =
        /^(да|давай|хочу|конечно|ок|окей|yes|sure|of course|let's|let s|yeah|yep|ok|okay|absolutely|want)$/i.test(
          trimmed,
        );
      const isNo = /^(нет|не хочу|no|don't want|dont want|nope|not now|no thanks)$/i.test(trimmed);

      if (isYes) {
        state.setIsWaitingForRestartConfirm(false);
        state.clearHistory('interviewer');
      } else if (isNo) {
        state.setIsWaitingForRestartConfirm(false);
        const aiReply: Message = {
          id: crypto.randomUUID(),
          sender: 'ai',
          text: t('interviewer.newInterviewDecline'),
          timestamp: Date.now(),
        };
        if (existingThread) state.addMessage(existingThread.id, aiReply);
      } else {
        const aiReply: Message = {
          id: crypto.randomUUID(),
          sender: 'ai',
          text: t('interviewer.newInterviewUnknown'),
          timestamp: Date.now(),
        };
        if (existingThread) state.addMessage(existingThread.id, aiReply);
      }
      return;
    }
    if (type === 'interviewer') {
      const thread = state.threads.find(
        (thr: Thread) => thr.topic === state.activeTopic && thr.type === 'interviewer',
      );
      const lastMsg = thread?.messages.slice(-1)[0];
      if (lastMsg?.text === t('interviewer.newInterviewDecline')) {
        const text = forcedText || (state.inputs[state.activeTopic]?.[type]?.trim() ?? '');
        if (text) {
          if (!forcedText) {
            state.setInputs((prev: Record<string, Partial<Record<ThreadType, string>>>) => ({
              ...prev,
              [state.activeTopic!]: { ...prev[state.activeTopic!], [type]: '' },
            }));
          }
          const userMsg: Message = {
            id: crypto.randomUUID(),
            sender: 'user',
            text,
            timestamp: Date.now(),
          };
          const aiReply: Message = {
            id: crypto.randomUUID(),
            sender: 'ai',
            text: t('interviewer.alreadyDeclined'),
            timestamp: Date.now(),
          };
          if (thread) {
            state.addMessage(thread.id, userMsg);
            state.addMessage(thread.id, aiReply);
          }
          return;
        }
      }
    }

    const text = forcedText || (state.inputs[state.activeTopic]?.[type]?.trim() ?? '');
    if (!text) return;

    if (type === 'interviewer' && state.timer !== null) {
      state.setTimer(null);
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    const existingThread = state.threads.find(
      (thread: Thread) => thread.topic === state.activeTopic && thread.type === type,
    );
    const targetThreadId = existingThread?.id ?? crypto.randomUUID();

    state.setThreads((current: Thread[]) => {
      const idx = current.findIndex(
        (thread: Thread) => thread.topic === state.activeTopic && thread.type === type,
      );
      if (idx !== -1) {
        const updated = [...current];
        updated[idx] = { ...updated[idx], messages: [...updated[idx].messages, userMessage] };
        return updated;
      }
      const newThread: Thread = {
        id: targetThreadId,
        topic: state.activeTopic!,
        type,
        messages: [
          {
            id: crypto.randomUUID(),
            sender: 'ai',
            text: getStartMessageForType(type, state.activeTopic),
            timestamp: Date.now() - THREAD_TIMESTAMP_OFFSET_MS,
          },
          userMessage,
        ],
      };
      return [...current, newThread];
    });

    if (!forcedText && state.activeTopic) {
      state.setInputs((prev: Record<string, Partial<Record<ThreadType, string>>>) => ({
        ...prev,
        [state.activeTopic!]: { ...prev[state.activeTopic!], [type]: '' },
      }));
    }

    // Language check: if user wrote in wrong script, warn and skip API call
    if (!forcedText) {
      const lang = (i18n.resolvedLanguage || 'en').toLowerCase();
      const letters = text.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
      if (letters.length > 2) {
        const cyr = (letters.match(/[а-яА-ЯёЁ]/g) || []).length;
        const lat = (letters.match(/[a-zA-Z]/g) || []).length;
        if (lang === 'en' && cyr > lat) {
          state.addMessage(targetThreadId, {
            id: crypto.randomUUID(),
            sender: 'ai',
            text: t('errors.speakLanguage'),
            timestamp: Date.now(),
          });
          return;
        }
      }
    }

    state.setIsWaitingForAnswer(true);
    state.setWaitingForType(type);
    await simulateAiReply(targetThreadId, text, type, state.activeTopic);
  };

  const startAiInterviewSimulation = async () => {
    if (!state.activeTopic) return;

    state.setIsWaitingForAnswer(true);
    state.setWaitingForType('ai-interview');

    let targetThreadId = state.threads.find(
      (t) => t.topic === state.activeTopic && t.type === 'ai-interview',
    )?.id;

    if (!targetThreadId) {
      targetThreadId = crypto.randomUUID();
      const newThread: Thread = {
        id: targetThreadId,
        topic: state.activeTopic,
        type: 'ai-interview',
        messages: [
          {
            id: crypto.randomUUID(),
            sender: 'ai',
            text: getStartMessageForType('ai-interview', state.activeTopic),
            timestamp: Date.now(),
          },
        ],
      };
      state.setThreads((prev: Thread[]) => [...prev, newThread]);
    }

    const systemPrompt = t('prompts.aiInterview', {
      topic: state.activeTopic,
      level: state.aiInterviewLevel,
    });

    const aiResponseText = await callGroqAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: t('prompts.aiInterviewNextExchange') },
    ]);

    state.setIsWaitingForAnswer(false);
    state.setWaitingForType(null);

    const candidateIdx = aiResponseText.search(/\bCandidate\s*:/i);
    const interviewerText = (
      candidateIdx > 0 ? aiResponseText.slice(0, candidateIdx) : aiResponseText
    )
      .replace(/^\s*Interviewer\s*:\s*/i, '')
      .trim();
    const candidateText =
      candidateIdx > 0
        ? aiResponseText
            .slice(candidateIdx)
            .replace(/^\s*Candidate\s*:\s*/i, '')
            .trim()
        : '';

    if (interviewerText) {
      const qMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: interviewerText,
        timestamp: Date.now(),
        aiRole: 'interviewer',
      };
      state.setThreads((curr: Thread[]) =>
        curr.map((t: Thread) =>
          t.id === targetThreadId ? { ...t, messages: [...t.messages, qMsg] } : t,
        ),
      );
    }

    if (candidateText) {
      setTimeout(() => {
        const aMsg: Message = {
          id: crypto.randomUUID(),
          sender: 'ai',
          text: candidateText,
          timestamp: Date.now() + CANDIDATE_DELAY_MS,
          aiRole: 'candidate',
        };
        state.setThreads((curr: Thread[]) =>
          curr.map((t: Thread) =>
            t.id === targetThreadId ? { ...t, messages: [...t.messages, aMsg] } : t,
          ),
        );
        const threadType = `ai-interview-${state.aiInterviewLevel}`;
        const thread = state.threadsRef.current.find((t) => t.id === targetThreadId);
        if (thread && state.activeTopic) {
          const allMsgs = candidateText
            ? [
                ...thread.messages,
                {
                  id: crypto.randomUUID(),
                  sender: 'ai' as const,
                  text: candidateText,
                  timestamp: Date.now() + CANDIDATE_DELAY_MS,
                  aiRole: 'candidate' as const,
                },
              ]
            : thread.messages;
          saveThreadHistory(state.activeTopic, threadType, allMsgs).catch(() => {});
        }
      }, AI_INTERVIEW_DELAY_MS);
    } else if (state.activeTopic) {
      const threadType = `ai-interview-${state.aiInterviewLevel}`;
      const thread = state.threadsRef.current.find((t) => t.id === targetThreadId);
      if (thread) {
        saveThreadHistory(state.activeTopic, threadType, thread.messages).catch(() => {});
      }
    }
  };

  return {
    handleSend,
    startAiInterviewSimulation,
    getStartMessageForType,
  };
};
