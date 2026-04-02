import {
  createTheme,
  CSSVariablesResolver,
  MantineProvider,
  Button,
  ActionIcon,
  Accordion,
  SegmentedControl,
  TextInput,
  PasswordInput,
  Modal,
  Textarea,
  Menu,
} from '@mantine/core';
import { ReactNode } from 'react';
import { LAYOUT_CONFIG } from '../constants/layout';

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
    md: '10px',
    lg: '16px',
    xl: '28px',
    '2xl': '32px',
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.5',
    lg: '1.6',
  },
  fontSizes: {
    xs: '12px',
    sm: '13px',
    md: '14px',
    lg: '15px',
    xl: '20px',
    '2xl': '28px',
    '3xl': '36px',
    hero: '56px',
    display: '120px',
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
      '#eff6ff',
      '#dbeafe',
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6',
      '#2563eb',
      '#1d4ed8',
      '#1e40af',
      '#1e3a8a',
    ],
  },
  headings: {
    fontWeight: '800',
    sizes: {
      h1: { fontSize: '3rem', lineHeight: '1.2' },
      h3: { fontSize: '1.5rem', lineHeight: '1.3' },
    },
  },
  components: {
    Button: Button.extend({
      styles: (_, props) => {
        if (props.variant === 'default') {
          return {
            root: {
              backgroundColor: 'var(--accent-subtle)',
              borderColor: 'var(--border)',
              color: 'var(--text-main)',
            },
          };
        }
        return {};
      },
    }),
    ActionIcon: ActionIcon.extend({
      styles: (theme, props) => {
        if (props.variant === 'default') {
          return {
            root: {
              backgroundColor: 'var(--accent-subtle)',
              borderColor: 'var(--border)',
              color: 'var(--text-main)',
            },
          };
        }
        return {};
      },
    }),
    Accordion: Accordion.extend({
      styles: () => ({
        control: {
          ['&:hover']: {
            backgroundColor: 'var(--accent-subtle)',
          },
        },
        item: {
          borderColor: 'var(--border)',
        },
      }),
    }),
    SegmentedControl: SegmentedControl.extend({
      vars: () => ({
        root: {
          '--sc-label-color': 'var(--text-on-accent)',
          '--sc-color': 'var(--accent)',
        },
      }),
      styles: () => ({
        root: {
          backgroundColor: 'var(--panel-soft)',
          borderColor: 'var(--border)',
        },
        indicator: {
          backgroundColor: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent-glow)',
        },
        label: {
          color: 'var(--text-main)',
          fontFamily: 'inherit',
        },
      }),
    }),
    TextInput: TextInput.extend({
      styles: () => ({
        input: {
          backgroundColor: 'var(--panel-soft)',
          borderColor: 'var(--border)',
          color: 'var(--text-main)',
          ['&::placeholder']: {
            color: 'var(--text-dim)',
          },
        },
        label: {
          color: 'var(--text-main)',
        },
      }),
    }),
    PasswordInput: PasswordInput.extend({
      styles: () => ({
        input: {
          backgroundColor: 'var(--panel-soft)',
          borderColor: 'var(--border)',
          color: 'var(--text-main)',
        },
        innerInput: {
          color: 'var(--text-main)',
          ['&::placeholder']: {
            color: 'var(--text-dim)',
          },
        },
        label: {
          color: 'var(--text-main)',
        },
      }),
    }),
    Modal: Modal.extend({
      styles: () => ({
        content: {
          backgroundColor: 'var(--panel)',
          borderColor: 'var(--border)',
          border: '1px solid var(--border)',
        },
        header: {
          backgroundColor: 'var(--panel)',
          color: 'var(--text-main)',
        },
        title: {
          color: 'var(--text-main)',
          fontWeight: 700,
        },
        body: {
          color: 'var(--text-main)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }),
    }),
    Textarea: Textarea.extend({
      styles: () => ({
        input: {
          backgroundColor: 'var(--panel-soft)',
          borderColor: 'var(--border)',
          color: 'var(--text-main)',
          ['&::placeholder']: {
            color: 'var(--text-dim)',
          },
        },
        label: {
          color: 'var(--text-main)',
        },
      }),
    }),
    Menu: Menu.extend({
      vars: () => ({
        dropdown: {
          '--menu-item-hover': 'var(--accent-subtle)',
        },
      }),
      styles: () => ({
        dropdown: {
          backgroundColor: 'var(--panel)',
          borderColor: 'var(--border)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-heavy)',
        },
        item: {
          color: 'var(--text-main)',
        },
      }),
    }),
  },
});

const resolver: CSSVariablesResolver = () => ({
  variables: {
    '--app-max-width': `${LAYOUT_CONFIG.CONTAINER_WIDTH}px`,
    '--header-height': `${LAYOUT_CONFIG.HEADER_HEIGHT}px`,
    '--app-side-padding': `${LAYOUT_CONFIG.SIDE_PADDING}px`,
    '--board-max-height': `${LAYOUT_CONFIG.BOARD_MAX_HEIGHT}px`,

    '--z-header': '100',
    '--z-dropdown': '150',
    '--z-modal': '200',
    '--z-toast': '300',

    '--gradient-pink': 'linear-gradient(45deg, #e64980, #ae3ec9)',
    '--gradient-cyan': 'linear-gradient(45deg, #22b8cf, #3b82f6)',
    '--gradient-orange': 'linear-gradient(45deg, #f08c00, #ff922b)',
  },
  light: {
    '--bg': 'linear-gradient(145deg, #f0f7ff 0%, #e6f0fd 50%, #dbeafe 100%)',
    '--sidebar-bg': 'linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%)',
    '--card-bg': 'rgba(255, 255, 255, 0.92)',
    '--panel': '#ffffff',
    '--panel-soft': '#eff6ff',

    '--border': 'rgba(59, 130, 246, 0.15)',
    '--shadow-light': '0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(59, 130, 246, 0.08)',
    '--shadow-heavy': '0 8px 32px rgba(15, 23, 42, 0.10), 0 4px 16px rgba(59, 130, 246, 0.12)',

    '--text-main': '#0f172a',
    '--text-dim': '#475569',
    '--text-on-accent': '#ffffff',

    '--accent': '#2563eb',
    '--accent-hover': '#1d4ed8',
    '--accent-subtle': 'rgba(37, 99, 235, 0.08)',
    '--accent-glow': 'rgba(37, 99, 235, 0.25)',
    '--gradient-accent': 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',

    '--error': '#dc2626',
    '--error-subtle': 'rgba(220, 38, 38, 0.08)',
    '--success': '#15803d',
    '--success-subtle': 'rgba(21, 128, 61, 0.08)',
    '--warning': '#d97706',
    '--warning-subtle': 'rgba(217, 119, 6, 0.08)',

    '--code-bg': 'rgba(37, 99, 235, 0.07)',
    '--code-user-bg': 'rgba(255, 255, 255, 0.80)',

    '--mantine-color-body': '#f0f7ff',
    '--mantine-color-text': '#0f172a',
    '--mantine-color-placeholder': '#475569',
    '--mantine-color-default-hover': 'rgba(37, 99, 235, 0.08)',
  },
  dark: {
    '--bg': 'linear-gradient(145deg, #080d18 0%, #0a1228 50%, #0d1635 100%)',
    '--sidebar-bg': 'linear-gradient(180deg, #0c1428 0%, #101b38 100%)',
    '--card-bg': 'rgba(15, 23, 42, 0.82)',
    '--panel': '#111827',
    '--panel-soft': '#1e293b',

    '--border': 'rgba(99, 163, 255, 0.12)',
    '--shadow-light': '0 2px 8px rgba(0, 0, 0, 0.28), 0 1px 3px rgba(0, 0, 0, 0.20)',
    '--shadow-heavy': '0 8px 32px rgba(0, 0, 0, 0.48), 0 4px 16px rgba(0, 0, 0, 0.32)',

    '--text-main': '#f1f5f9',
    '--text-dim': '#94a3b8',
    '--text-on-accent': '#ffffff',

    '--accent': '#3b82f6',
    '--accent-hover': '#60a5fa',
    '--accent-subtle': 'rgba(59, 130, 246, 0.12)',
    '--accent-glow': 'rgba(59, 130, 246, 0.35)',
    '--gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',

    '--error': '#f87171',
    '--error-subtle': 'rgba(248, 113, 113, 0.12)',
    '--success': '#4ade80',
    '--success-subtle': 'rgba(74, 222, 128, 0.12)',
    '--warning': '#fb923c',
    '--warning-subtle': 'rgba(251, 146, 60, 0.12)',

    '--code-bg': 'rgba(59, 130, 246, 0.10)',
    '--code-user-bg': 'rgba(255, 255, 255, 0.12)',

    '--mantine-color-body': '#080d18',
    '--mantine-color-text': '#f1f5f9',
    '--mantine-color-placeholder': '#94a3b8',
    '--mantine-color-default-hover': 'rgba(59, 130, 246, 0.12)',
  },
});

export default function MantineProviderWrapper({ children }: MantineProviderWrapperProps) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
