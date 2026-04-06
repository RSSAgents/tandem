import { useEffect, useState } from 'react';
import { getLeaderboard, LeaderboardUser } from '@/api/leaderboard.api';
import { scoreEvents } from '@/utils/scoreEvents';

export const useLeaderboard = () => {
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard();
      setLeaders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    const unsubscribe = scoreEvents.subscribe(() => {
      fetchLeaderboard();
    });

    return unsubscribe;
  }, []);

  return { leaders, loading, error, refresh: fetchLeaderboard };
};
