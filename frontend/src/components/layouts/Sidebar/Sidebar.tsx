import { Box, Stack } from '@mantine/core';
import { PrizeCard } from '../../features/PrizeCard/PrizeCard';
import { ProgressBar } from '../../features/ProgressBar/ProgressBar';
import { UserBlock } from '../../features/UserBlock/UserBlock';
import classes from './Sidebar.module.css';
import { SidebarNavigation } from './SidebarNavigation';

export const Sidebar = () => {
  const user = { name: 'Alex', rank: 'Mage' };

  return (
    <Stack className={classes.sidebar}>
      <Box>
        <UserBlock name={user.name} rank={user.rank} />
        <SidebarNavigation />
        <ProgressBar current={3} total={6} />
        <PrizeCard title={'Bronze Badge'} description={'Complete 1 module'} />
      </Box>
    </Stack>
  );
};
