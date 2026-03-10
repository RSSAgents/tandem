import { Box, Progress, Text } from '@mantine/core';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = memo(({ current, total }: ProgressBarProps) => {
  const { t } = useTranslation(['shared']);

  const percentage = useMemo(() => {
    return total > 0 ? (current / total) * 100 : 0;
  }, [current, total]);

  return (
    <Box className={classes.wrapper}>
      <Text size="xs" className={classes.label}>
        {t('shared:progress', { current, total })}
      </Text>
      <Progress
        value={percentage}
        radius="xl"
        classNames={{
          root: classes.progressRoot,
          section: classes.progressBar,
        }}
      />
    </Box>
  );
});
