import { Message } from '@/types/aiAgentTypes';
import { supabase } from '@utils/supabase';

export const loadAllScores = async (): Promise<Record<string, number>> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};

  const { data, error } = await supabase
    .from('ai_topic_scores')
    .select('topic, score')
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);

  return Object.fromEntries((data ?? []).map((row) => [row.topic, row.score]));
};

export const saveTopicScore = async (topic: string, score: number): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from('ai_topic_scores').upsert(
    {
      user_id: user.id,
      topic,
      score,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,topic' },
  );

  if (error) throw new Error(error.message);
};

export const loadThreadHistory = async (topic: string, threadType: string): Promise<Message[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('ai_message_history')
    .select('messages')
    .eq('user_id', user.id)
    .eq('topic', topic)
    .eq('thread_type', threadType)
    .maybeSingle();

  return (data?.messages as Message[]) ?? [];
};

export const saveThreadHistory = async (
  topic: string,
  threadType: string,
  messages: Message[],
): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from('ai_message_history').upsert(
    {
      user_id: user.id,
      topic,
      thread_type: threadType,
      messages,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,topic,thread_type' },
  );

  if (error) throw new Error(error.message);
};

export const clearThreadHistory = async (topic: string, threadType: string): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('ai_message_history')
    .delete()
    .eq('user_id', user.id)
    .eq('topic', topic)
    .eq('thread_type', threadType);

  if (error) throw new Error(error.message);
};
