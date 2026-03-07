import { ThemeType } from '@/types/theme';
import { useMantineColorScheme } from '@mantine/core';

export const CodeEditorConfig = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === ThemeType.DARK;

  return {
    theme: isDark ? 'vs-dark' : 'vs',
    options: {
      minimap: { enabled: false },
      fontSize: 14,
      automaticLayout: true,
    },
    defaultLanguage: 'javascript',
    defaultValue: '// Code ...',
  };
};
