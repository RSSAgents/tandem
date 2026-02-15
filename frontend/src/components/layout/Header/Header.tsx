import {
  ActionIcon,
  Box,
  Button,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { headerStyles } from './HeaderStyles';

export const Header = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <Box component="header" style={headerStyles.header}>
      <Group justify="flex-end" h="100%">
        <Button variant="default">Log in</Button>
        <Button>Sign up</Button>
        <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          size="xl"
          radius="md"
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === 'light' ? (
            <IconSun style={headerStyles.icon} stroke={1.5} />
          ) : (
            <IconMoon style={headerStyles.icon} stroke={1.5} />
          )}
        </ActionIcon>
      </Group>
    </Box>
  );
};
