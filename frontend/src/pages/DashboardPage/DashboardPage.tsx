import { ModuleCard } from '@/components/ui/Card/WidgetCard';
import { ROUTE_PATHS } from '@/routes/routePaths';
import { Box, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './DashboardPage.module.css';

const completedIds: string[] = [];

const DASHBOARD_WIDGETS = [
  {
    id: 'js-exec',
    title: 'widgets.js_execution.title',
    description: 'widgets.js_execution.description',
    path: ROUTE_PATHS.WIDGET_CONSOLE,
  },
] as const;

export const DashboardPage = () => {
  const { t } = useTranslation('dashboard');

  const userName = 'Alex';

  const { widgets, stats } = useMemo(() => {
    const items = DASHBOARD_WIDGETS.map((w) => ({
      ...w,
      isCompleted: completedIds.includes(w.id),
    }));

    const total = items.length;
    const completed = items.filter((w) => w.isCompleted).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const progressKey =
      percent === 0 ? 'progress_zero' : percent >= 100 ? 'progress_finished' : 'progress_started';

    return { widgets: items, stats: { percent, progressKey } };
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Stack gap={4} mb={40}>
        <Title className={classes.welcomeTitle}>{t('welcome', { name: userName })}</Title>
        <Text className={classes.progressText}>
          {t(stats.progressKey, '', { percent: stats.percent })}
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={28}>
        {widgets.map((widget) => (
          <ModuleCard
            key={widget.id}
            title={t(widget.title)}
            description={t(widget.description)}
            path={widget.path}
            status={t(widget.isCompleted ? 'status.completed' : 'status.todo')}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
