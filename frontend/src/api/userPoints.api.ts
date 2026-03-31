import { supabase } from '@/utils/supabase';

export const getUserTotalScore = async (userId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('widget_scores')
    .select('score')
    .eq('user_id', userId);

  if (error) {
    return 0;
  }

  if (!data || data.length === 0) {
    return 0;
  }

  const totalScore = data.reduce((sum, item) => sum + item.score, 0);

  return totalScore;
};
