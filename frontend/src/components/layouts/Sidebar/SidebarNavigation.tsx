import { ROUTE_PATHS } from '@/routes/routePaths';
import { NavLink, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import classes from './Sidebar.module.css';

const SIDEBAR_NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTE_PATHS.DASHBOARD, disabled: false },
  { label: 'About', path: ROUTE_PATHS.ABOUT, disabled: false },
  { label: 'Library', path: ROUTE_PATHS.LIBRARY, disabled: false },
  { label: 'Achievements', path: ROUTE_PATHS.ACHIEVEMENTS, disabled: true },
  { label: 'Leaderboard', path: ROUTE_PATHS.LEADERBOARD_PAGE, disabled: false },
] as const;

export const SidebarNavigation = () => {
  const { pathname } = useLocation();

  return (
    <Stack gap="sm">
      {SIDEBAR_NAV_ITEMS.map(({ label, path, disabled }) => {
        const commonProps = {
          key: path,
          label,
          active: pathname === path,
          className: classes.navLink,
          variant: 'filled' as const,
        };

        if (disabled) {
          return <NavLink {...commonProps} disabled />;
        }

        return <NavLink {...commonProps} component={Link} to={path} />;
      })}
    </Stack>
  );
};
