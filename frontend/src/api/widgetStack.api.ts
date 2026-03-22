import { supabase } from '@/utils/supabase';

export const saveStackScore = async (score: number) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('widget_scores')
    .upsert({
      user_id: user.id,
      widget_type: 'stack',
      score,
      max_score: 20,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,widget_type'
    })

  if (error) throw new Error(error.message)
}
