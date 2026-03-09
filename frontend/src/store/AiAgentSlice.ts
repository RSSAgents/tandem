import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export type ThreadType = 'interviewer' | 'teacher' | 'battle';

export interface Thread {
  id: string;
  topic: string;
  type: ThreadType;
  messages: Message[];
  updatedAt: number;
}

interface AiAgentState {
  threads: Thread[];
  activeTopic: string | null;
  isLoading: boolean;
}

const initialState: AiAgentState = {
  threads: [],
  activeTopic: null,
  isLoading: false,
};

export const fetchAiResponse = createAsyncThunk(
  'aiAgent/fetchAiResponse',
  async ({ threadId, text }: { threadId: string; text: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      threadId,
      text: `AI reply to message: "${text.substring(0, 30)}..."`,
    };
  },
);

const aiAgentSlice = createSlice({
  name: 'aiAgent',
  initialState,
  reducers: {
    setActiveTopic: (state, action: PayloadAction<string>) => {
      state.activeTopic = action.payload;
    },

    addUserMessage: (
      state,
      action: PayloadAction<{ topic: string; type: ThreadType; text: string }>,
    ) => {
      const { topic, type, text } = action.payload;
      let thread = state.threads.find((t) => t.topic === topic && t.type === type);

      if (!thread) {
        thread = {
          id: crypto.randomUUID(),
          topic,
          type,
          messages: [],
          updatedAt: Date.now(),
        };
        state.threads.push(thread);
      }

      thread.messages.push({
        id: crypto.randomUUID(),
        sender: 'user',
        text,
        timestamp: Date.now(),
      });
      thread.updatedAt = Date.now();
    },

    resetBattle: (state, action: PayloadAction<string>) => {
      const thread = state.threads.find((t) => t.topic === action.payload && t.type === 'battle');
      if (thread) {
        thread.messages = [];
        thread.updatedAt = Date.now();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAiResponse.fulfilled, (state, action) => {
      const thread = state.threads.find((t) => t.id === action.payload.threadId);
      if (thread) {
        thread.messages.push({
          id: crypto.randomUUID(),
          sender: 'ai',
          text: action.payload.text,
          timestamp: Date.now(),
        });
        thread.updatedAt = Date.now();
      }
    });
  },
});

export const { setActiveTopic, addUserMessage, resetBattle } = aiAgentSlice.actions;
export default aiAgentSlice.reducer;
