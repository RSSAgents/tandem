import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { scoreEvents } from '@/utils/scoreEvents';
import { getUserTotalScore } from '@/api/userPoints.api';

export const useUserScore = () => {
  const [score, setScore] = useState<number | null>(0);

  const fetchScore = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const totalScore = await getUserTotalScore(user.id);
      setScore(totalScore);
    } else {
      setScore(0);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadScore = async () => {
      if (!isMounted) return;
      await fetchScore();
    };

    loadScore();

    return () => {
      isMounted = false;
    };
  }, [fetchScore]);

  useEffect(() => {
    const unsubscribe = scoreEvents.subscribe(() => {
      fetchScore();
    });

    return unsubscribe;
  }, [fetchScore]);

  return {
    score,
    refreshScore: fetchScore,
  };
};
