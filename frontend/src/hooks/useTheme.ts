import { ThemeType } from '@/types/theme';
import { useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';

export const useTheme = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && (savedTheme === ThemeType.LIGHT || savedTheme === ThemeType.DARK)) {
      setColorScheme(savedTheme);
    }
  }, [setColorScheme]);

  const handleToggleTheme = () => {
    const newTheme = colorScheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
    setColorScheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme: colorScheme,
    handleToggleTheme,
    isDark: colorScheme === ThemeType.DARK,
    isLight: colorScheme === ThemeType.LIGHT,
  };
};
