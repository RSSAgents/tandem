import { useTheme } from '@hooks/useTheme';
import { ActionIcon, Box, Burger, Button, Group, Text } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.css';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onBurgerClick?: () => void;
  burgerOpened?: boolean;
}

export const Header = ({ onBurgerClick, burgerOpened = false }: HeaderProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const { handleToggleTheme, isDark } = useTheme();
  const { t } = useTranslation('header');
  const { user, loading, logout } = useAuth();

  if (loading) return null;

  return (
    <Box component="header" className={classes.header}>
      <Group gap="xs">
        <Burger
          opened={burgerOpened}
          onClick={onBurgerClick}
          size="sm"
          aria-label="Toggle navigation"
          hiddenFrom="sm"
        />
        <Text component={Link} to="/" className={classes.logo}>
          Tandem
        </Text>
      </Group>
      <Group className={classes.group}>
        {!isLoginPage && !isRegisterPage && (
          <>
            {user ? (
              <Button color="red" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="default" component={Link} to="/login">
                  {t('login')}
                </Button>
                <Button component={Link} to="/register">
                  {t('signup')}
                </Button>
              </>
            )}
          </>
        )}
        <ActionIcon
          onClick={handleToggleTheme}
          variant="default"
          size="xl"
          radius="md"
          aria-label={t('themeToggle')}
        >
          {isDark ? <IconSun className={classes.icon} /> : <IconMoon className={classes.icon} />}
        </ActionIcon>
        <LanguageSwitcher />
      </Group>
    </Box>
  );
};
