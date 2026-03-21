import { Paper, Stack, Text } from '@mantine/core';
import classes from './PrizeCard.module.css';

interface PrizeCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const PrizeCard = ({ title, description, icon }: PrizeCardProps) => {
  return (
    <Paper className={classes.card} p="md" radius="lg" withBorder>
      <Stack gap={2}>
        <Text size="sm" className={classes.title}>
          {title}
        </Text>
        <Text size="xs" className={classes.description}>
          {description}
        </Text>
      </Stack>
      {icon && <div className={classes.iconWrapper}>{icon}</div>}
    </Paper>
  );
};
