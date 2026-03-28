/* eslint-disable no-console */
// src/api/userPoints.ts
import { supabase } from '@/utils/supabase';

/**
 * Получить общую сумму баллов пользователя
 * @param userId - ID пользователя из Supabase auth
 * @returns сумма всех баллов по всем виджетам
 */
export const getUserTotalScore = async (userId: string): Promise<number> => {
  console.log('getUserTotalScore вызван для userId:', userId); // <-- добавить

  const { data, error } = await supabase
    .from('widget_scores')
    .select('widget_type, score, max_score') // <-- добавили widget_type
    .eq('user_id', userId);

  if (error) {
    console.error('Ошибка при получении баллов:', error);
    return 0;
  }

  console.log('Данные из БД:', data); // <-- добавить

  if (!data || data.length === 0) {
    console.log('Нет данных, возвращаем 0'); // <-- добавить
    return 0;
  }

  const totalScore = data.reduce((sum, item) => sum + item.score, 0);
  console.log('Подсчитанная сумма:', totalScore); // <-- добавить

  return totalScore;
};
