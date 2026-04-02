import { supabase } from '@/utils/supabase';
import { scoreEvents } from '@/utils/scoreEvents';

let hasCheckedCompletion = false;
let isAlreadyCompleted = false;

export const saveStackScore = async (score: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (!hasCheckedCompletion) {
    const { data: existing } = await supabase
      .from('widget_scores')
      .select('score')
      .eq('user_id', user.id)
      .eq('widget_type', 'stack')
      .single();

    if (existing && existing.score > 0) {
      isAlreadyCompleted = true;
    }
    hasCheckedCompletion = true;
  }

  if (isAlreadyCompleted) {
    return;
  }

  const { data: currentData } = await supabase
    .from('widget_scores')
    .select('score')
    .eq('user_id', user.id)
    .eq('widget_type', 'stack')
    .single();

  const currentScore = currentData?.score || 0;

  if (currentScore === score) {
    return;
  }

  const { error } = await supabase.from('widget_scores').upsert(
    {
      user_id: user.id,
      widget_type: 'stack',
      score,
      max_score: 20,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'user_id,widget_type',
    },
  );

  if (error) throw new Error(error.message);

  scoreEvents.emit();
};
