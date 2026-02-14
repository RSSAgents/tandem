import { ActionIcon, Button, Group, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './Header.module.css';

export const Header = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
   <header className={classes.header}>
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
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
      </Group>
    </header>
  );
};
