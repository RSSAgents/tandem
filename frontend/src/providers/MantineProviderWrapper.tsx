import { createTheme, CSSVariablesResolver, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

interface MantineProviderWrapperProps {
  children: ReactNode;
}

const theme = createTheme({
  primaryColor: 'brand',
  fontFamily: 'Inter, sans-serif',

  defaultRadius: 'md',
  radius: {
    xs: '4px',
    sm: '6px',
    md: '10px', //Input
    lg: '16px', // Button
    xl: '28px', //Cards
    '2xl': '32px', //404 container, login container
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.5',
    lg: '1.6',
  },
  fontSizes: {
    xs: '12px',
    sm: '13px', //team story, team-responsibilities
    md: '14px', //team-role
    lg: '15px', //Button txt((Login, Sign In, Register))
    xl: '20px', //team name, "You’ve wandered off the learning path"
    '2xl': '28px',
    '3xl': '36px',
    hero: '56px', // "Meet Our Team" header
    display: '120px', //"404"
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
    '5xl': '60px',
    '6xl': '80px',
    huge: '120px',
  },
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
    '--z-header': '100',
    '--z-dropdown': '150',
    '--z-modal': '200',
    '--z-toast': '300',

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
    '--accent-hover': '#0a7ae0',
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
    '--accent-hover': '#3392ff',
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
