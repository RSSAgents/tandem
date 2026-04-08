import { ROUTE_PATHS } from '@/routes/routePaths';
import { NavLink, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import classes from './Sidebar.module.css';
import { useTranslation } from 'react-i18next';

interface SidebarNavigationProps {
  onClose?: () => void;
}

export const SidebarNavigation = ({ onClose }: SidebarNavigationProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation('sidebar');

  const SIDEBAR_NAV_ITEMS = [
    { label: t('sidebar.dashboard'), path: ROUTE_PATHS.DASHBOARD },
    { label: t('sidebar.about'), path: ROUTE_PATHS.ABOUT },
    { label: t('sidebar.library'), path: ROUTE_PATHS.LIBRARY },
    { label: t('sidebar.leaderboard'), path: ROUTE_PATHS.LEADERBOARD_PAGE },
  ] as const;

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
          onClick={onClose}
        />
      ))}
    </Stack>
  );
};
