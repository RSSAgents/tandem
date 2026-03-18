import { useTranslation } from 'react-i18next';
import { AgentState, Message, Thread, ThreadType } from '../types/aiAgentTypes';
import {
  AI_INTERVIEW_DELAY_MS,
  CANDIDATE_DELAY_MS,
  MAX_QUESTIONS,
  MAX_SCORE,
  THREAD_TIMESTAMP_OFFSET_MS,
  TIMER_SECONDS,
  TYPING_CHARS_PER_FRAME,
} from '../utils/aiAgentConstants';
import { callGroqAPI, callGroqAPIStream } from '../utils/groqApiService';

export const useAiInterviewLogic = (state: AgentState) => {
  const { t } = useTranslation('aiAgent');

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
    if (/[а-яё]/i.test(userText)) {
      const langMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: t('errors.speakEnglish'),
        timestamp: Date.now(),
      };
      state.setThreads((threads: Thread[]) =>
        threads.map((thread) =>
          thread.id === threadId
            ? { ...thread, messages: [...thread.messages, langMessage] }
            : thread,
        ),
      );
      if (type === 'interviewer' || type === 'teacher') state.setIsWaitingForAnswer(false);
      return;
    }

    const currentThread = state.threads.find((t) => t.id === threadId) || { messages: [] };
    const refusalWord = state.role === 'strict' ? 'strictly' : 'politely';

    let systemPrompt = '';

    if (type === 'interviewer') {
      systemPrompt = `You are an expert technical interviewer for a Junior Frontend Developer position. Topic: ${manualActiveTopic}. Vanilla JS.
      STRICT RULES:
      1. Ask exactly ${MAX_QUESTIONS} questions total, but ONLY ONE question per response.
      2. DO NOT include question numbers in your output.
      3. Use '|||' to separate your feedback/comment about the user's previous answer and the next question. Example: "Great answer! ||| What is a closure?"
      4. If user doesn't answer, says "I don't know", or gives a vague answer:
         - In GENTLE mode: suggest "Skip this question" or offer a hint before proceeding.
         - In STRICT mode: make a snarky comment and move immediately to the next question.
      5. Only answer clarifying questions about the current interview question. Refuse all other questions ${refusalWord}.
      6. Tone: ${state.role.toUpperCase()}.
      7. On the 20th answer: Analyze everything and include 'FINAL_SCORE: X' (X=1-${MAX_SCORE}).`;
    } else if (type === 'teacher') {
      systemPrompt = `Mentor for frontend: ${manualActiveTopic}.
      You are an experienced IT mentor and teacher. Your main goal is to help the candidate arrive at the correct answer independently using the Socratic method.
      Your strict rules:
      1. **Never give a direct, ready-made answer immediately.**
      2. Ask guiding questions to nudge the user toward correct reasoning and a deeper understanding of the topic.
      3. **Maintain focus:** only answer questions related to the current topic ${manualActiveTopic}. Vanilla JS. If the request goes beyond frontend topics, politely decline and steer the conversation back to the interview.
      4. Be patient, supportive, and constructive.
      5. If the candidate is clearly stuck after several attempts, provide a conceptual hint or explain a complex term, but leave the final conclusion to them.
      6. Tone: ${state.role.toUpperCase()}.`;
    }

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...currentThread.messages.map((m) => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.text,
      })),
      { role: 'user', content: userText },
    ];

    const placeholderIds: string[] = [];
    const targetTexts: string[] = [];
    let streamDone = false;

    const typeMessage = (partIndex: number): Promise<void> => {
      return new Promise((resolve) => {
        let revealed = 0;
        const tick = () => {
          const target = targetTexts[partIndex] || '';
          const end = streamDone ? target.length : Math.min(revealed + TYPING_CHARS_PER_FRAME, target.length);
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
      targetTexts[i] = finalParts[i].trim();
    }

    if (typingPromise) await typingPromise;

    for (let i = 1; i < finalParts.length; i++) {
      await typeMessage(i);
    }

    if (type === 'interviewer' && aiResponseText.includes('FINAL_SCORE:')) {
      const match = aiResponseText.match(/FINAL_SCORE:\s*(\d+)/);
      if (match) {
        const score = parseInt(match[1], 10);
        state.addScore(manualActiveTopic, score);
      }
    }

    state.setIsWaitingForAnswer(false);
    if (type === 'interviewer' && state.stressMode === 'stress') {
      state.setTimer(TIMER_SECONDS);
    }
  };

  const handleSend = async (type: ThreadType, forcedText?: string) => {
    if (!state.activeTopic) return;
    const text = forcedText || (state.inputs[state.activeTopic]?.[type]?.trim() ?? '');
    if (!text) return;

    if (type === 'interviewer' && state.timer) {
      state.setTimer(null);
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    let targetThreadId = '';

    state.setThreads((current: Thread[]) => {
      const idx = current.findIndex(
        (thread: Thread) => thread.topic === state.activeTopic && thread.type === type,
      );
      if (idx !== -1) {
        targetThreadId = current[idx].id;
        const updated = [...current];
        updated[idx] = { ...updated[idx], messages: [...updated[idx].messages, userMessage] };
        return updated;
      }
      const newThread: Thread = {
        id: crypto.randomUUID(),
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
      targetThreadId = newThread.id;
      return [...current, newThread];
    });

    if (!forcedText && state.activeTopic) {
      state.setInputs((prev: Record<string, Partial<Record<ThreadType, string>>>) => ({
        ...prev,
        [state.activeTopic!]: { ...prev[state.activeTopic!], [type]: '' },
      }));
    }

    state.setIsWaitingForAnswer(true);
    await simulateAiReply(targetThreadId, text, type, state.activeTopic);
  };

  const startAiInterviewSimulation = async () => {
    if (!state.activeTopic) return;

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

    const systemPrompt = `You are both a professional Interviewer and a capable Candidate. Your task is to simulate a realistic interview experience. Topic: ${state.activeTopic} JavaScript. Play BOTH Interviewer and Candidate. Level: ${state.aiInterviewLevel}. Write only one part from the interviewer and one part from the candidate. Separate Interviewer and Candidate with "|||". No question numbers. If it's the 20th, add improvement tips.`;

    const aiResponseText = await callGroqAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'Next exchange.' },
    ]);

    const parts = aiResponseText.split('|||');
    const interviewerText = parts[0]?.trim();
    const candidateText = parts[1]?.trim();

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
      }, AI_INTERVIEW_DELAY_MS);
    }
  };

  return {
    handleSend,
    startAiInterviewSimulation,
    getStartMessageForType,
  };
};
