import { useTheme } from '@hooks/useTheme';
import { ActionIcon, Box, Button, Group, Text } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import classes from './Header.module.css';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const { handleToggleTheme, isDark } = useTheme();
  const { t } = useTranslation('header');

  return (
    <Box component="header" className={classes.header}>
      <Text component="a" href="/" className={classes.logo}>
        Tandem
      </Text>
      <Group className={classes.group}>
        <Button variant="default">{t('login')}</Button>
        <Button>{t('signup')}</Button>
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
