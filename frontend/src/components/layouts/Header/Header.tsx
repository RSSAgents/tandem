import { useTheme } from '@hooks/useTheme';
import { ActionIcon, Box, Button, Group, Text } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

export const Header = () => {
  const { handleToggleTheme, isDark } = useTheme();

  return (
    <Box component="header" className={classes.header}>
      <Text component="a" href="/" className={classes.logo}>
        Tandem
      </Text>
      <Group className={classes.group}>
        <Button variant="default" component={Link} to="/login">
          Log in
        </Button>
        <Button>Sign up</Button>
        <ActionIcon
          onClick={handleToggleTheme}
          variant="default"
          size="xl"
          radius="md"
          aria-label="Toggle color scheme"
        >
          {isDark ? <IconSun className={classes.icon} /> : <IconMoon className={classes.icon} />}
        </ActionIcon>
      </Group>
    </Box>
  );
};
