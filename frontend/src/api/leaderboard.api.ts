import { supabase } from '@/utils/supabase';

export interface LeaderboardUser {
  username: string;
  total_score: number;
  total_percent_ai: number;
}

export const getLeaderboard = async (): Promise<LeaderboardUser[]> => {
  try {
    const { data: users, error: usersError } = await supabase.rpc('get_leaderboard');

    if (usersError || !users || users.length === 0) {
      return [];
    }

    const filteredUsers = users.filter((user: LeaderboardUser) => user.total_score > 0);

    const leaderboard: LeaderboardUser[] = filteredUsers.map((user: LeaderboardUser) => ({
      username: user.username,
      total_score: user.total_score,
      total_percent_ai: user.total_percent_ai,
    }));

    return leaderboard.sort((a, b) => b.total_score - a.total_score);
  } catch {
    return [];
  }
};
