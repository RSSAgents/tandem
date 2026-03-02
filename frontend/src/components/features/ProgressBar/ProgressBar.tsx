import { Box, Progress, Text } from '@mantine/core';
import classes from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <Box className={classes.wrapper}>
      <Text size="xs" className={classes.label}>
        {current} of {total} modules completed
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
};
