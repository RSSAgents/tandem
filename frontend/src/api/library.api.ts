import { supabase } from '@/utils/supabase';
import { scoreEvents } from '@/utils/scoreEvents';

export const hasReceivedTodayBonus = async (userId: string): Promise<boolean> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('widget_scores')
    .select('updated_at')
    .eq('user_id', userId)
    .eq('widget_type', 'library')
    .maybeSingle();

  if (error || !data) return false;

  const lastAwardDate = new Date(data.updated_at).toISOString().split('T')[0];
  return lastAwardDate === today;
};

export const awardLibraryDailyBonus = async (
  userId: string,
): Promise<{
  success: boolean;
  points?: number;
  message?: string;
}> => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const { data: existing } = await supabase
      .from('widget_scores')
      .select('score, updated_at')
      .eq('user_id', userId)
      .eq('widget_type', 'library')
      .maybeSingle();

    if (existing) {
      const lastAwardDate = new Date(existing.updated_at).toISOString().split('T')[0];
      if (lastAwardDate === today) {
        return {
          success: false,
          message: 'You already received bonus today',
        };
      }
    }

    const currentScore = existing?.score || 0;
    const newScore = currentScore + 1;

    const { error: upsertError } = await supabase.from('widget_scores').upsert(
      {
        user_id: userId,
        widget_type: 'library',
        score: newScore,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,widget_type',
      },
    );

    if (upsertError) throw upsertError;

    scoreEvents.emit();

    return {
      success: true,
      points: 1,
      message: 'You earned 1 point for visiting Library today!',
    };
  } catch {
    return { success: false, message: 'Failed to award bonus' };
  }
};
