import { supabase } from '@/utils/supabase';

export const getThisTasks = async (signal?: AbortSignal) => {
  const { data, error } = await supabase
    .from('questions_public')
    .select('*')
    .eq('type', 'this')
    .order('id')
    .abortSignal(signal!);

  if (error) throw new Error(error.message);
  return data;
};

export const checkThisAnswer = async (questionId: string, userAnswer: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc('check_this_answer', {
    question_id: questionId,
    user_answer: userAnswer,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const saveThisScore = async (score: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from('widget_scores').upsert(
    {
      user_id: user.id,
      widget_type: 'this',
      score,
      max_score: 100,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'user_id,widget_type',
    },
  );

  if (error) throw new Error(error.message);
};
