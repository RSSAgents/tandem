import { ActionIcon, Box, Button, Group } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from '@hooks/useTheme';
import { headerStyles } from './HeaderStyles';

export const Header = () => {
  const { handleToggleTheme, isDark } = useTheme();

  return (
    <Box component="header" style={headerStyles.header}>
      <Group style={headerStyles.group}>
        <Button variant={headerStyles.buttonLogin.variant}>Log in</Button>
        <Button>Sign up</Button>
        <ActionIcon
          onClick={handleToggleTheme}
          variant={headerStyles.actionIcon.variant}
          size={headerStyles.actionIcon.size}
          radius={headerStyles.actionIcon.radius}
          aria-label="Toggle color scheme"
        >
          {' '}
          {isDark ? <IconSun style={headerStyles.icon} /> : <IconMoon style={headerStyles.icon} />}
        </ActionIcon>
      </Group>
    </Box>
  );
};
