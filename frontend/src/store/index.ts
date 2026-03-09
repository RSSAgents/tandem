import { configureStore } from '@reduxjs/toolkit';
import AiAgentReducer from './AiAgentSlice';

export const store = configureStore({
  reducer: {
    interview: AiAgentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
