import { ROUTE_PATHS } from '@/routes/routePaths';
import { NavLink, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import classes from './Sidebar.module.css';

const SIDEBAR_NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTE_PATHS.DASHBOARD },
  { label: 'Library', path: ROUTE_PATHS.LIBRARY },
  { label: 'Achievements', path: ROUTE_PATHS.ACHIEVEMENTS },
] as const;

export const SidebarNavigation = () => {
  const { pathname } = useLocation();

  return (
    <Stack gap="sm">
      {SIDEBAR_NAV_ITEMS.map(({ label, path }) => (
        <NavLink
          key={path}
          component={Link}
          to={path}
          label={label}
          active={pathname === path}
          className={classes.navLink}
          variant="filled"
        />
      ))}
    </Stack>
  );
};
