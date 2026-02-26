import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'blue',
  cursorType: 'pointer',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '800',
    sizes: {
      h1: { fontSize: '3rem', lineHeight: '1.2' },
      h3: { fontSize: '1.5rem', lineHeight: '1.3' },
    },
  },
});
