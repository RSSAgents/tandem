import { AgentState, Message, Thread, ThreadType } from '../types/aiAgentTypes';
import { callGroqAPI } from '../utils/groqApiService';

export const useAiInterviewLogic = (state: AgentState) => {
  const getStartMessageForType = (type: ThreadType, topic: string | null) => {
    const getInterviewerStartMessage = () => {
      if (state.role === 'gentle' && state.stressMode === 'normal') {
        return 'In this window, you can practice taking an interview for a Junior Frontend Developer position. Choose one of the topics on the left side of the screen, and I will ask you 20 questions. At the end, I will evaluate your knowledge level on a 10-point scale.';
      }
      if (state.role === 'strict' && state.stressMode === 'normal') {
        return 'This is a strict interview simulation for a Junior Frontend Developer role. Select a topic on the left. You will face 20 hard questions without pleasantries. At the end, you will receive an evaluation from 1 to 10.';
      }
      if (state.role === 'gentle' && state.stressMode === 'stress') {
        return 'Welcome to the stress interview. Choose one of the topics on the left side of the screen, and I will ask you 20 questions. You will have only 90 seconds to answer each question. At the end, I will evaluate your knowledge level on a 10-point scale.';
      }
      return 'Welcome to the stress interview. Select a topic. Be prepared for 20 tough, high-pressure questions and criticism. I will challenge your answers. Final evaluation from 1 to 10 at the end.';
    };

    const getTeacherStartMessage = () => {
      if (state.stressMode === 'stress') return 'Teacher help is unavailable in Stress mode.';
      if (state.role === 'strict') {
        return 'I am your strict mentor. Ask your questions on the selected topic, but be ready to think. I am here to deepen your understanding, not to spoon-feed you direct answers.';
      }
      return 'In this window, you can ask any questions regarding the selected topic. I am ready to help you get to the core of the subject and deepen your understanding!';
    };

    const getAiInterviewStartMessage = () => {
      if (state.role === 'gentle' && state.stressMode === 'normal')
        return `Welcome to the AI Simulation. You will observe a gentle, step-by-step interview for a ${state.aiInterviewLevel.toUpperCase()} position.`;
      if (state.role === 'strict' && state.stressMode === 'normal')
        return `Welcome to the strict AI Simulation. Watch a realistic, tough interview for a ${state.aiInterviewLevel.toUpperCase()} position.`;
      if (state.role === 'gentle' && state.stressMode === 'stress')
        return `Stress AI Simulation loaded. You will see a fast-paced, timed interview for a ${state.aiInterviewLevel.toUpperCase()} developer.`;
      return `Intense Stress AI Simulation. Observe a high-pressure interview scenario for a ${state.aiInterviewLevel.toUpperCase()} candidate.`;
    };

    if (type === 'teacher') return getTeacherStartMessage();
    if (type === 'ai-interview') {
      let msg = getAiInterviewStartMessage();
      if (topic)
        msg += `\n\nSimulation topic selected: ${topic}. Press the button below to generate the first question and answer.`;
      return msg;
    }
    let msg = getInterviewerStartMessage();
    if (topic) msg += `\n\nAre you ready to start the interview on the topic of ${topic}?`;
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
        text: 'Please communicate in English.',
        timestamp: Date.now(),
      };
      state.setThreads((current: Thread[]) =>
        current.map((thread) =>
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
      systemPrompt = `You are an expert technical interviewer for a Junior Frontend Developer position. Topic: ${manualActiveTopic}.
      STRICT RULES:
      1. Ask exactly 20 questions total, but ONLY ONE question per response.
      2. DO NOT include question numbers in your output.
      3. Use '|||' to separate your feedback/comment about the user's previous answer and the next question. Example: "Great answer! ||| What is a closure?"
      4. If user doesn't answer, says "I don't know", or gives a vague answer:
         - In GENTLE mode: suggest "Skip this question" or offer a hint before proceeding.
         - In STRICT mode: make a snarky comment and move immediately to the next question.
      5. Only answer clarifying questions about the current interview question. Refuse all other questions ${refusalWord}.
      6. Tone: ${state.role.toUpperCase()}.
      7. On the 20th answer: Analyze everything and include 'FINAL_SCORE: X' (X=1-10).`;
    } else if (type === 'teacher') {
      systemPrompt = `Mentor for frontend: ${manualActiveTopic}.
      You are an experienced IT mentor and teacher. Your main goal is to help the candidate arrive at the correct answer independently using the Socratic method.
      Your strict rules:
      1. **Never give a direct, ready-made answer immediately.**
      2. Ask guiding questions to nudge the user toward correct reasoning and a deeper understanding of the topic.
      3. **Maintain focus:** only answer questions related to the current topic ${manualActiveTopic}. If the request goes beyond frontend topics, politely decline and steer the conversation back to the interview.
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

    const aiResponseText = await callGroqAPI(apiMessages);

    if (type === 'interviewer' && aiResponseText.includes('FINAL_SCORE:')) {
      const match = aiResponseText.match(/FINAL_SCORE:\s*(\d+)/);
      if (match) {
        const score = parseInt(match[1], 10);
        state.addScore(manualActiveTopic, score);
      }
    }

    const responseParts = aiResponseText.split('|||');
    const newMessages: Message[] = responseParts.map((part: string) => ({
      id: crypto.randomUUID(),
      sender: 'ai',
      text: part.trim(),
      timestamp: Date.now(),
    }));

    state.setThreads((current: Thread[]) =>
      current.map((thread) =>
        thread.id === threadId
          ? { ...thread, messages: [...thread.messages, ...newMessages] }
          : thread,
      ),
    );

    state.setIsWaitingForAnswer(false);
    if (type === 'interviewer' && state.stressMode === 'stress') {
      state.setTimer(90);
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
            timestamp: Date.now() - 1000,
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

    state.setIsWaitingForAnswer(true);

    const systemPrompt = `Realistic dialogue about ${state.activeTopic}. Play BOTH Interviewer and Candidate. Level: ${state.aiInterviewLevel}.
    RULES: 1. No question numbers. 2. Separate Interviewer and Candidate with "|||". 3. If it's the 20th, add improvement tips.`;

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
          sender: 'candidate',
          text: candidateText,
          timestamp: Date.now(),
        };
        state.setThreads((curr: Thread[]) =>
          curr.map((t: Thread) =>
            t.id === targetThreadId ? { ...t, messages: [...t.messages, aMsg] } : t,
          ),
        );
        state.setIsWaitingForAnswer(false);
      }, 1500);
    } else {
      state.setIsWaitingForAnswer(false);
    }
  };

  return {
    handleSend,
    simulateAiReply,
    startAiInterviewSimulation,
    getStartMessageForType,
  };
};
