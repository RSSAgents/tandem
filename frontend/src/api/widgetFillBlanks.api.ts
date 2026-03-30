import { supabase } from '@/utils/supabase';

export const getFillBlanksTasks = async (signal?: AbortSignal) => {
  const { data, error } = await supabase
    .from('questions_public')
    .select('*')
    .eq('type', 'fill-blanks')
    .order('id')
    .abortSignal(signal!);

  if (error) throw new Error(error.message);
  return data;
};

export const checkFillBlanksAnswer = async (
  questionId: string,
  statementId: string,
  answerIndex: number,
): Promise<boolean> => {
  const { data, error } = await supabase.rpc('check_fill_blanks_answer', {
    question_id: questionId,
    statement_id: statementId,
    answer_index: answerIndex,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const saveFillBlanksScore = async (score: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from('widget_scores').upsert(
    {
      user_id: user.id,
      widget_type: 'fill-blanks',
      score,
      max_score: 80,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'user_id,widget_type',
    },
  );

  if (error) throw new Error(error.message);
};
