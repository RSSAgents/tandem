import { Box, Stack } from '@mantine/core';
import { PrizeCard } from '../../features/PrizeCard/PrizeCard';
import { ProgressBar } from '../../features/ProgressBar/ProgressBar';
import { UserBlock } from '../../features/UserBlock/UserBlock';
import classes from './Sidebar.module.css';
import { SidebarNavigation } from './SidebarNavigation';

export const Sidebar = () => {
  const user = { name: 'Alex', rank: 'Mage' };
  const stats = { current: 3, total: 6 };

  const MOCK_PRIZES = [
    { id: 1, title: 'Bronze Badge', description: 'Complete 1 module' },
    { id: 2, title: 'Silver Medal', description: 'Complete 3 modules' },
    { id: 3, title: ' Gold Trophy', description: 'Complete 6 modules' },
  ];

  return (
    <Stack className={classes.sidebar}>
      <Box>
        <UserBlock name={user.name} rank={user.rank} />
        <SidebarNavigation />
      </Box>
      <Stack gap="md">
        <ProgressBar current={stats.current} total={stats.total} />
        {MOCK_PRIZES.map((prize) => (
          <PrizeCard key={prize.id} {...prize} />
        ))}
      </Stack>
    </Stack>
  );
};
