import { DASHBOARD_WIDGETS, getCompletedIds } from '@/utils/DashboardPage-utils';
import { supabase } from '@/utils/supabase';
import { WidgetCard } from '@components/ui/Card/WidgetCard';
import { Box, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './DashboardPage.module.css';

export const DashboardPage = () => {
  const { t } = useTranslation('dashboard');
  const [userName, setUserName] = useState<string | null>(null);
  const completedIds = getCompletedIds();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setUserName('User');
        return;
      }
      const username = data?.user?.user_metadata?.username ?? 'User';
      setUserName(username);
    };

    fetchUser();
  }, []);

  const { widgets, stats } = useMemo(() => {
    const items = DASHBOARD_WIDGETS.map((widget) => ({
      ...widget,
      isCompleted: completedIds.includes(widget.id),
    }));

    const total = items.length;
    const completed = items.filter((widget) => widget.isCompleted).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const progressKey =
      percent === 0 ? 'progress_zero' : percent >= 100 ? 'progress_finished' : 'progress_started';

    return { widgets: items, stats: { percent, progressKey } };
  }, [completedIds]);

  return (
    <Box className={classes.wrapper}>
      <Stack gap={4} mb={40}>
        <Title className={classes.welcomeTitle}>
          {userName === null ? <Loader size={20} /> : t('welcome', { name: userName })}{' '}
        </Title>
        <Text className={classes.progressText}>
          {t(stats.progressKey, '', { percent: stats.percent })}
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={28}>
        {widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            title={t(widget.title)}
            description={t(widget.description)}
            path={widget.path}
            status={t(widget.isCompleted ? 'widgets.status.completed' : 'widgets.status.todo')}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
