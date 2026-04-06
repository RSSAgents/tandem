import { Box, Text, Flex, Paper, Progress } from '@mantine/core';
import classes from './Sidebar.module.css';
import { useTranslation } from 'react-i18next';

interface SidebarSnailProgressProps {
  percent: number;
  title?: string;
  showTitle?: boolean;
  compact?: boolean;
}

export const SidebarSnailProgress = ({
  percent: rawPercent,
  title,
  showTitle = true,
  compact = false,
}: SidebarSnailProgressProps) => {
  const { t } = useTranslation('sidebar');

  const percent = Math.min(100, Math.max(0, rawPercent || 0));
  const snailPosition = `${percent}%`;

  return (
    <Paper className={`${classes.progressBlock} ${compact ? classes.compact : ''}`}>
      {showTitle && (
        <Flex align="center" gap="xs" mb="xl">
          <Text className={classes.progressTitle}>{title || t('sidebar.snailProgress.title')}</Text>
        </Flex>
      )}

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
