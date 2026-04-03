import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { awardLibraryDailyBonus, hasReceivedTodayBonus } from '@/api/library.api';

export const useLibraryBonus = () => {
  const [loading, setLoading] = useState(true);
  const [awarded, setAwarded] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const checkAndAwardBonus = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const hasReceived = await hasReceivedTodayBonus(user.id);

      if (hasReceived) {
        setAwarded(false);
        setLoading(false);
        return;
      }

      const result = await awardLibraryDailyBonus(user.id);

      if (result.success) {
        setAwarded(true);
        setPoints(result.points || 0);
      } else {
        setAwarded(false);
      }

      setLoading(false);
    };

    checkAndAwardBonus();
  }, []);

  return { loading, awarded, points };
};
