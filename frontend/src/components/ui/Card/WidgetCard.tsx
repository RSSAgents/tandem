// components/ModuleCard.tsx
import { Box, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './WidgetCard.module.css';

interface ModuleCardProps {
  title: string;
  description: string;
  status?: string;
  path: string;
}

export const ModuleCard = ({ title, description, status, path }: ModuleCardProps) => {
  return (
    <Box component={Link} to={path} className={classes.card}>
      <Stack justify="space-between" h="100%">
        <Box>
          <Text className={classes.title} fw={600}>
            {title}
          </Text>
          <Text className={classes.description} size="sm">
            {description}
          </Text>
        </Box>

        {status && <Text className={classes.status}>{status}</Text>}
      </Stack>
    </Box>
  );
};
