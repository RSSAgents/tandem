import { Box, Text, Flex, Paper, Progress } from '@mantine/core';
import { useAiAgentState } from '@/hooks/useAiAgentState';
import classes from './Sidebar.module.css';
import { useTranslation } from 'react-i18next';

export const SidebarSnailProgress = () => {
  const { t } = useTranslation('sidebar');
  const { readinessPercentage } = useAiAgentState();

  const percent = Math.min(100, Math.max(0, readinessPercentage || 0));
  const snailPosition = `${percent}%`;

  return (
    <Paper className={classes.progressBlock}>
      <Flex align="center" gap="xs" mb="xl">
        <Text className={classes.progressTitle}>{t('sidebar.snailProgress.title')}</Text>
      </Flex>

      <Box className={classes.progressWrapper}>
        <Progress value={percent} color="teal" />
        <Box className={classes.snail} style={{ left: `calc(${snailPosition} - 12px)` }}>
          <Text size="xl" className={classes.snailEmoji}>
            🐌
          </Text>
        </Box>
      </Box>

      <Flex justify="space-between" mt="xs" className={classes.labels}>
        <Text size="xl" fw={700} className={classes.percentage}>
          {percent}%
        </Text>
      </Flex>
    </Paper>
  );
};
