import { Box, Stack } from '@mantine/core';
import classes from './Sidebar.module.css';
import { SidebarNavigation } from './SidebarNavigation';

export const Sidebar = () => {
  return (
    <Stack className={classes.sidebar}>
      <Box>
        <SidebarNavigation />
      </Box>
    </Stack>
  );
};
