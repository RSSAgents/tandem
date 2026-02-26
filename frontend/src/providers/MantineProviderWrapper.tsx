import { createTheme, CSSVariablesResolver, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

interface MantineProviderWrapperProps {
  children: ReactNode;
}

const theme = createTheme({
  primaryColor: 'brand',
   fontFamily: 'Inter, sans-serif',
   colors: {
    brand: [
      '#e6f2ff',
      '#cce4ff',
      '#99c9ff',
      '#66adff',
      '#3392ff',
      '#0a84ff',
      '#006fe0',
      '#005bb8',
      '#00478f',
      '#003366',
    ],
  },
});

const resolver: CSSVariablesResolver = () => ({
  variables: {
    '--shadow-light': '0 20px 40px rgba(0, 0, 0, 0.5)',
    '--shadow-heavy': '0 60px 120px rgba(0, 0, 0, 0.8)',
  },
  light: {
    '--bg': '#f5f7fa',
    '--card-bg': 'rgba(255, 255, 255, 0.85)',
    '--panel': '#ffffff',
    '--panel-soft': '#f1f3f6',
    '--border': 'rgba(0, 0, 0, 0.08)',
    '--text-main': '#0f172a',
    '--text-dim': '#64748b',
    '--accent': '#2563eb',
    '--mantine-color-body': '#f5f7fa',
    '--mantine-color-text': '#0f172a',
  },
  dark: {
    '--bg': '#0b0b0f',
    '--card-bg': 'rgba(17, 17, 22, 0.85)',
    '--panel': '#111116',
    '--panel-soft': '#15151c',
    '--border': 'rgba(255, 255, 255, 0.08)',
    '--text-main': '#f5f5f7',
    '--text-dim': '#8e8e93',
    '--accent': '#0a84ff',
    '--mantine-color-body': '#0b0b0f',
    '--mantine-color-text': '#f5f5f7',
  },
});

export default function MantineProviderWrapper({ children }: MantineProviderWrapperProps) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
