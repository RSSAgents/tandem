import { ActionIcon, Box, Button, Group } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { headerStyles } from './HeaderStyles';
import { useTheme } from '@hooks/useTheme';

export const Header = () => {
  const { handleToggleTheme, isDark } = useTheme();

  return (
    <Box component="header" style={headerStyles.header}>
      <Group justify="flex-end" h="100%">
        <Button variant="default">Log in</Button>
        <Button>Sign up</Button>
        <ActionIcon
          onClick={handleToggleTheme}
          variant="default"
          size="xl"
          radius="md"
          aria-label="Toggle color scheme"
        >
          {' '}
          {isDark ? (
            <IconSun style={headerStyles.icon} stroke={1.5} />
          ) : (
            <IconMoon style={headerStyles.icon} stroke={1.5} />
          )}
        </ActionIcon>
      </Group>
    </Box>
  );
};
