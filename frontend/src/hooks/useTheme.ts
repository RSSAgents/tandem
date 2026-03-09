import { useMantineColorScheme } from '@mantine/core';

export const useTheme = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const handleToggleTheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme: colorScheme,
    handleToggleTheme,
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light',
  };
};
